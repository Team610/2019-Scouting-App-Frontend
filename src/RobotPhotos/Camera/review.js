import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./robotPhoto.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
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
        <img className="robotImage" src={this.image} />
      </div>
    );
  }
}

export default Review;
