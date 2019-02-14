import React from "react";

export default class PostBid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bidType: "",
      bidPrice: ""
    }
    this.handleBidtypeChange = this.handleBidtypeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.postProjectBid = this.postProjectBid.bind(this);
  }

  handleBidtypeChange(evt) {
    this.setState({
      bidType: evt.target.value
    });
  }

  handlePriceChange(evt) {
    this.setState({
      bidPrice: evt.target.value
    });
  }

  postProjectBid() {
    this.props.postBid({
      bidderId: 3,
      bidType: this.state.bidType,
      bidPrice: this.state.bidPrice,
      projectId: this.props.projectId
    });
    this.setState({
      bidType: "",
      bidPrice: ""
    });
  }

  render() {
    return <div className="post-project-section">
      <h4>Do you want to place bid :</h4>
      <div style={{display: "inlineBlock"}}>
        Bid type : <select type="select" value={this.state.bidType} onChange={this.handleBidtypeChange}>
          <option value="">--select--</option>
          <option value="Fixed">Fixed</option>
          <option value="Hourly">Hourly</option>
        </select><br/>
        Bid price : <input type="text" value={this.state.bidPrice} onChange={this.handlePriceChange}></input>
      </div>
      <div style={{display: "inlineBlock"}}>
        <input type="button" value="Place Bid" onClick={this.postProjectBid}></input>
      </div>
    </div>;
  }
}