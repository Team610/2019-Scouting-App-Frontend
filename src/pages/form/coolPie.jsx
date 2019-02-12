import React, { Component } from "react";
import PieMenu, { Slice } from "react-pie-menu";
import "./coolcode.css";

class CoolPie extends Component {
  constructor(props) {
    super(props);
    this.state = { popup: this.props.menuPopup, x: 0, y: 0 };
  }

  render() {
    console.log(this.props.menuPopup);
    return this.state.popup ? (
      <PieMenu
        radius="125px"
        centerRadius="20px"
        centerX="100px"
        centerY="100px"
      >
        <div />
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ popup: false });
          }}
        >
          <p className="nonSelectable">Hatch</p>
        </Slice>
        <div />
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ popup: false });
          }}
        >
          <p className="nonSelectable">Cargo</p>
        </Slice>
      </PieMenu>
    ) : null;
    // </div>
  }
}

export default CoolPie;
