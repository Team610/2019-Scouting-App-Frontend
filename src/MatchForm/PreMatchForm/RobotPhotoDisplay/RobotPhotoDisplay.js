import React, { Component } from "react";

class RobotPhotoDisplay extends Component{
//   constructor(props){
//     super(props);
//   }
  render(){
    return(
      <React.Fragment>
        <p className="subheader"> Robot (Look for THIS one) </p>
        <img src={require("./ph.png")} alt="robot here" height="240"></img>
      </React.Fragment>
    );
  }
}
export default RobotPhotoDisplay;
