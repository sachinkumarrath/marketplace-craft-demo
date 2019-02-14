import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import BuyerHome from "./buyer";
import SellerHome from "./seller";
import ProjectHome from "./final-projects";
import { getAllProject, postProject, getAllBidders, postBid, getAllBids } from "./api/api";

import style from "../styles/style.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      projectList: [],
      projects: [],
      projectBids: [],
      bidders: []
    }
    this.postProject = this.postProject.bind(this);
    this.postBid = this.postBid.bind(this);
  }

  componentDidMount() {
    Promise.all([getAllProject(), getAllBidders(), getAllBids()]).then(responses => {
      this.setState({
        projectList: this.formProjectList(responses[0], responses[2]),
        projects: responses[0],
        bidders: responses[1],
        projectBids: responses[2]
      });
    });
  }

  postProject(projectData) {
    postProject(this.state.projects, projectData).then(projects => {
      this.setState({
        projects,
        projectList: this.formProjectList(projects, this.state.projectBids)
      });
    });
  }

  postBid(bidData) {
    postBid(this.state.projectBids, bidData).then(projectBids => {
      this.setState({
        projectBids,
        projectList: this.formProjectList(this.state.projects, projectBids)
      });
    });
  }

  formProjectList(sortedProjectList, sortedProjectBids) {
    let sortedProjectBidMap = {};
    sortedProjectBids.forEach(projectBid => {
      if (!sortedProjectBidMap[projectBid.projectId]) {
        sortedProjectBidMap[projectBid.projectId] = {
          bidderId: projectBid.bidderId,
          bidType: projectBid.bidType,
          bidPrice: projectBid.bidPrice
        }
      }
    });
    return sortedProjectList.map(projectItem => Object.assign({}, projectItem, sortedProjectBidMap[projectItem.projectId]));
  }

  render() {
    return <div>
      <div className="marketplace-header">Marketplace Craft</div>
      <Router>
      <div className="marketplace-content">
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
        <Route path="/buyer" render={() => <BuyerHome projectList={this.state.projectList} postBid={this.postBid} />} />
        <Route path="/final-project" render={() => <ProjectHome projectList={this.state.projectList} />} />
      </div>
      </Router>
      </div>;
  }
}

ReactDOM.render(
  <Home />, 
  document.getElementById("base-container")
);
