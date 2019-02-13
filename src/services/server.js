import express from "express";
import bodyParser from "body-parser";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../../webpack.config";

import projects from "../mocks/projects";

const port = 1900;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use("/project", bodyParser.json());

app.get(["/buyer", "/seller"], (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/index.html"));
});

app.post("/project", (req, res) => {
  const requestData = JSON.parse(JSON.stringify(req.body));
  const {projectName, projectDescription, projectExpiration} = requestData.projectData;
  const projectList = requestData.projectList;

  let updatedProjectList = [...projectList, {
    projectId: projectList[projectList.length - 1].projectId + 1,
    projectName,
    projectDescription,
    projectExpiration,
    status: "OPEN"
  }];
  res.send(updatedProjectList);
});

app.get("/project", (req, res) => {
  res.send(projects);
});

app.post("/project/quote", (req, res) => {
  res.send("Congratulation for express installation");
});

app.listen(port);
console.log("--------server started--------");
