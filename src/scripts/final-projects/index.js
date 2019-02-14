import React from "react";
import ProjectList from "../component/ProjectList";

export default class ProjectHome extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return <div>
        <ProjectList viewType="project" projectList={this.props.projectList.filter(project => project.status === "CLOSE")} />
      </div>;
  }
}