import React, { Component } from "react";
import "../../style.css";

class RobotPhotoDisplay extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <p className="subheader"> Robot (Look for THIS one) </p>
        <img src={require("./ph.png")} height="240"></img>
      </div>
    );
  }
}
export default RobotPhotoDisplay;
