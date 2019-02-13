import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BuyerHome from "./buyer";
import SellerHome from "./seller";
import { getAllProject, postProject } from "./api/api";

import style from "../styles/style.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      projectList: []
    }
    this.postProject = this.postProject.bind(this);
  }

  componentDidMount() {
    getAllProject().then(projectList => {
      this.setState({
        projectList: projectList
      });
    });
  }

  postProject(projectData) {
    postProject(this.state.projectList, projectData).then(projectList => {
      this.setState({
        projectList: projectList
      });
    });
  }

  render() {
    return <div>
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/seller">Seller</Link>
            </li>
            <li>
              <Link to="/buyer">Buyer</Link>
            </li>
          </ul> */}
          {/* <Route path="/seller" component={SellerHome} />
          <Route path="/buyer" component={BuyerHome} /> */}
          <Route path="/seller" render={() => <SellerHome 
            projectList={this.state.projectList}
            postProject={this.postProject} />} />
          <Route path="/buyer" render={() => <BuyerHome projectList={this.state.projectList} />} />
          </div>
        </Router>
      </div>;
  }
}

ReactDOM.render(
  <Home />, 
  document.getElementById("base-container")
);
