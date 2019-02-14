import React from "react";
import ProjectList from "../component/ProjectList";

export default class SellerHome extends React.Component {
  constructor() {
    super();
    this.postProject = this.postProject.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleProjectDescriptionChange = this.handleProjectDescriptionChange.bind(this);
    this.handleProjectExpirationChange = this.handleProjectExpirationChange.bind(this);
    this.state = {
      projectName: "",
      projectDescription: "",
      projectExpiration: ""
    }
  }

  handleProjectNameChange(evt) {
    this.setState({
      projectName: evt.target.value
    });
  }

  handleProjectDescriptionChange(evt) {
    this.setState({
      projectDescription: evt.target.value
    });
  }

  handleProjectExpirationChange(evt) {
    this.setState({
      projectExpiration: evt.target.value
    });
  }

  postProject() {
    this.props.postProject(this.state);
    this.setState({
      projectName: "",
      projectDescription: "",
      projectExpiration: ""
    });
  }

  render() {
    return <div>
        <h2>Post a new project</h2>
        <div className="project-input">
          <div className="project-input-field">
            <div>Project Name :</div>
            <div><input type="text" value={this.state.projectName} onChange={this.handleProjectNameChange}></input></div>
          </div>
          <div className="project-input-field">
            <div>Project Description :</div>
            <div><input type="text" value={this.state.projectDescription} onChange={this.handleProjectDescriptionChange}></input></div>
          </div>
          <div className="project-input-field">
            <div>Project Expiration :</div>
            <div><input type="text" value={this.state.projectExpiration} onChange={this.handleProjectExpirationChange}></input></div>
          </div>
          <div className="project-post">
            <input type="button" value="Post Project" onClick={this.postProject}></input>
          </div>
        </div>
        <ProjectList viewType="seller" projectList={this.props.projectList} />
     </div>;
  }
}