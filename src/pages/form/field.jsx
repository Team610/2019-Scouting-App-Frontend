import React, { Component } from "react";

const topHP = [[110, 90], [125, 90], [110, 130], [125, 130]];
const bottomHP = [[110, 250], [125, 250], [110, 290], [125, 290]];
const topRocket = [[300, 325], [350, 325], [300, 365], [350, 365]];
const bottomRocket = [[300, 550], [350, 550], [300, 595], [350, 595]];
const cargoShip = [[320, 415], [420, 415], [320, 470], [420, 470]];

class FieldIMG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: 0,
      mouseY: 0
    };
  }

  render() {
    return (
      <html>
        <div>
          <h2>
            {this.state.mouseX}, {this.state.mouseY}
          </h2>
        </div>
        <div onClick={this.getClickPosition}>
          <img src={require("./2019-field.PNG")} />
        </div>
      </html>
    );
  }

  getClickPosition = e => {
    this.setState({ mouseX: e.clientX });
    this.setState({ mouseY: e.clientY });
  };
}

export default FieldIMG;
