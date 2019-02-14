import React from "react";
import PostBid from "./PostBid";

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="project-list">
      <h2>Current Projects</h2>
      <div className="project-list-ul">
        {this.props.projectList.map(project => {
          return <div className="project-list-item" key={project.projectId}>
            <h3>{project.projectName}</h3>
            <div>
              {project.projectDescription}<br/><br/>
              Project status : {project.status}<br/>
              Last day of bid : {project.projectExpiration}<br/>
              Lowest bid till date : {project.bidPrice}<br/>
              Bid type : {project.bidType}<br/>
              {this.props.viewType === "project" ? `Bidder Name : ${project.bidderId}` : null}
              {this.props.viewType === "buyer" && project.status === "OPEN" ?
                <PostBid projectId={project.projectId} postBid={this.props.postBid} /> : null}
            </div>
          </div>
        })}
      </div>
    </div>;
  }
}
