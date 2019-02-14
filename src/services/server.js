import express from "express";
import bodyParser from "body-parser";
import path from "path";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../../webpack.config";

import projects from "../mocks/projects";
import projectBids from "../mocks/project-bids";
import bidders from "../mocks/bidders";

const port = 1900;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use("/project", bodyParser.json());

app.get(["/buyer", "/seller", "/final-project"], (req, res) => {
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
  const sortedProjectList = updatedProjectList.sort((proj1, proj2) => proj1.projectId - proj2.projectId);
  res.send(sortedProjectList);
});

app.get("/project", (req, res) => {
  // const sortedProjectBids = projectBids.sort((bid1, bid2) => {
  //   if(bid1.projectId !== bid2.projectId) {
  //     return bid1.projectId - bid2.projectId;
  //   } else {
  //     return bid1.bidPrice - bid2.bidPrice;
  //   }
  // });
  // let sortedProjectBidMap = {};
  // sortedProjectBids.forEach(projectBid => {
  //   if (!sortedProjectBidMap[projectBid.projectId]) {
  //     sortedProjectBidMap[projectBid.projectId] = {
  //       bidderId: projectBid.bidderId,
  //       bidType: projectBid.bidType,
  //       bidPrice: projectBid.bidPrice
  //     }
  //   }
  // });
  const sortedProjectList = projects.sort((proj1, proj2) => proj1.projectId - proj2.projectId);
  // const modifiedProjectList = sortedProjectList.map(projectItem => Object.assign({}, projectItem, sortedProjectBidMap[projectItem.projectId]));
  res.send(sortedProjectList);
});

app.post("/project/bid", (req, res) => {
  const requestData = JSON.parse(JSON.stringify(req.body));
  const {projectId, bidderId, bidType, bidPrice} = requestData.bidData;
  const projectBids = requestData.projectBids;
  let updatedProjectBids = [...projectBids, {
    projectId,
    bidderId,
    bidType,
    bidPrice
  }];
  const sortedProjectBids = updatedProjectBids.sort((bid1, bid2) => {
    if(bid1.projectId !== bid2.projectId) {
      return bid1.projectId - bid2.projectId;
    } else {
      return bid1.bidPrice - bid2.bidPrice;
    }
  });
  res.send(sortedProjectBids);
});

app.get("/project/bids", (req, res) => {
  const sortedProjectBids = projectBids.sort((bid1, bid2) => {
    if(bid1.projectId !== bid2.projectId) {
      return bid1.projectId - bid2.projectId;
    } else {
      return bid1.bidPrice - bid2.bidPrice;
    }
  });
  res.send(sortedProjectBids);
});

app.get("/project/bidders", (req, res) => {
  res.send(bidders);
});

app.listen(port);
console.log("--------server started--------");
