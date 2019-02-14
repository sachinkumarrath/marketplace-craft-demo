import React from "react";
import ProjectList from "../component/ProjectList";

export default class BuyerHome extends React.Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
    return <div>
        <ProjectList viewType="buyer" projectList={this.props.projectList} postBid={this.props.postBid} />
      </div>;
  }
}