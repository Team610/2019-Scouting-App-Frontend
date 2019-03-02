import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./robotPhoto.css";


class Review extends Component {
  constructor(props) {
    super(props);
    this.teamNumber = this.props.teamNum;
    this.orientation = this.props.orient;
    console.log(this.props.img);
    this.image = this.props.img;
  }

  render() {
    console.log(this.teamNumber);
    return (
      <div>
        <img src={this.image} />
      </div>
    );
  }
}

export default Review;
