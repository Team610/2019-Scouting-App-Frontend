import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./robotPhoto.css";

import Review from "./review";

class RobotCamera extends Component {
  constructor() {
    super();
    this.state = {
      submit: false,
      teamNumber: 0,
      file: "",
      orientation: ""
    };

    this.facing = true;
    this.facingMode = "FACING_MODES.ENVIRONMENT";
  }

  onTakePhoto(dataUri) {
    this.setState({ file: dataUri });
    this.setState({ teamNumber: document.getElementById("teamInput").value });
    this.setState({ orientation: document.getElementById("dropdown").value });
    this.setState({ submit: true });
    // console.log(this.state.submit);
  }

  flipCamera() {
    console.log("flip");
    if (this.facing === false) {
      this.facing = true;
    } else {
      this.facing = false;
    }
    this.facingMode = this.facing
      ? "FACING_MODES.ENVIRONMENT"
      : "FACING_MODES.USER";
  }

  setOrientation(orientation) {
    this.orientation = orientation;
    console.log(this.orientation);
  }

  renderSubmit() {
    console.log("submit");
    return this.state.submit ? (
      <Review
        teamNum={this.state.teamNumber}
        orient={this.state.orientation}
        img={this.state.file}
      />
    ) : null;
  }

  render() {
    return (
      <div className="Camera">
        <button onClick={this.flipCamera()}>Flip camera</button>
        <Camera
          imageType="IMAGE_TYPES.JPG"
          idealFacingMode={this.state.facingMode}
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri);
          }}
        />
        <p>Team Number:</p>
        <form>
          <input type="text" id="teamInput" />
        </form>
        <div>
          <select id="dropdown">
            <option value="front">Front</option>
            <option value="side">Side</option>
            <option value="back">Back</option>
            <option value="top">Top</option>
          </select>
        </div>
        {this.renderSubmit()}

        <button
          onClick={() => {
            let obj = {};
            obj.teamNum = this.state.teamNum;
            obj.orientation = this.state.orientation;
            obj.image = this.state.file;
            console.log("yeet");
          }}
        >
          Submit Photo
        </button>
        <button
          id="retake"
          onClick={() => {
            if (this.state.submit) {
              this.setState({ submit: false });
            }
          }}
        >
          Retake Photo
        </button>
      </div>
    );
  }
}

export default RobotCamera;
