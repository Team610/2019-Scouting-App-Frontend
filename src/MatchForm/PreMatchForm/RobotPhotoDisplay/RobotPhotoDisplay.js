import React, { Component } from "react";
import "../../style.css";

class RobotPhotoDisplay extends Component{
  render(){
    return(
      <div>
        <p class="subheader"> Robot (Look for THIS ONE) </p>
        <img src={require("./ph.png")} height="240"></img>
      </div>
    );
  }
}
export default RobotPhotoDisplay;
