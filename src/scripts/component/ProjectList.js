import React from "react";

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="project-list">
      <h2>Current Projects</h2>
      <ul>
        {this.props.projectList.map(project => {
          return <div className="project-list-item" key={project.projectId}>
            <h3>{project.projectName}</h3>
            <div>
              {project.projectDescription}<br/><br/>
              Last day of bid : {project.projectExpiration}<br/>
              Lowest bid till date : {project.projectLowestBid}<br/>
              Bid type : {project.projectBidType}<br/>
              Project status : {project.projectStatus}
            </div>
          </div>
        })}
      </ul>
    </div>;
  }
}
