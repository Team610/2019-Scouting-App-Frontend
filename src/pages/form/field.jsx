import React, { Component } from "react";
import CoolPie from "./coolPie";
import PieMenu, { Slice } from "react-pie-menu";
const topHP = [[110, 90], [125, 90], [110, 130], [125, 130]];
const bottomHP = [110, 250, 125, 290];
const topRocket = [300, 325, 350, 365];
const bottomRocket = [300, 590, 350, 635];
const cargoShip = [[320, 415], [420, 415], [320, 470], [420, 470]];

class FieldIMG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: 0,
      mouseY: 0,
      menu: false,
      secondStage: false,
      close: false
    };
  }

  checkBounds(a) {
    var bool = false;

    if (
      this.state.mouseX >= a[0] &&
      this.state.mouseX <= a[2] &&
      this.state.mouseY >= a[1] &&
      this.state.mouseY <= a[3]
    ) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }

  render() {
    return (
      <html>
        <div>
          <h2>
            {this.state.mouseX}, {this.state.mouseY}
          </h2>
        </div>
        <div onMouseDown={this.getClickPosition}>
          <div>
            <img src={require("./2019-field.PNG")} />
            {this.loadMenu()}
            {this.returnSecondRocket()}
          </div>
        </div>

        <div />
      </html>
    );
  }

  getClickPosition = e => {
    this.setState({ mouseX: e.clientX });
    this.setState({ mouseY: e.clientY + 40 });
    this.setState({ menu: true });
  };

  loadMenu = () => {
    if (this.state.close === true) {
      this.setState({ menu: false });
      this.setState({ close: false });
    }
    if (this.state.menu === false && this.state.secondStage === true) {
      this.setState({ secondStage: false });
    }
    if (this.checkBounds(topRocket) || this.checkBounds(bottomRocket)) {
      return this.state.menu ? (
        <html>
          <PieMenu
            radius="125px"
            centerRadius="20px"
            centerX={`${this.state.mouseX}px`}
            centerY={`${this.state.mouseY}px`}
          >
            <Slice
              className="nonSelectable"
              onMouseOver={() => {
                this.setState({ secondStage: true });
              }}
            >
              <p className="nonSelectable">Level 1</p>
            </Slice>

            <Slice
              className="nonSelectable"
              onMouseOver={() => {
                this.setState({ secondStage: true });
              }}
            >
              <p className="nonSelectable">Level 2</p>
            </Slice>
            <Slice
              className="nonSelectable"
              onMouseOver={() => {
                this.setState({ secondStage: true });
              }}
            >
              <p className="nonSelectable">Level 3</p>
            </Slice>
          </PieMenu>
        </html>
      ) : null;
    } else {
      return this.state.menu ? (
        <PieMenu
          radius="125px"
          centerRadius="20px"
          centerX={`${this.state.mouseX}px`}
          centerY={`${this.state.mouseY}px`}
        >
          <div />
          <Slice
            className="nonSelectable"
            onSelect={() => {
              this.setState({ menu: false });
            }}
          >
            <p className="nonSelectable">Hatch</p>
          </Slice>
          <div />
          <Slice
            className="nonSelectable"
            onSelect={() => {
              this.setState({ menu: false });
            }}
          >
            <p className="nonSelectable">Cargo</p>
          </Slice>
        </PieMenu>
      ) : null;
    }
  };
  returnSecondRocket = () => {
    return this.state.secondStage && this.state.menu ? (
      <PieMenu
        radius="250px"
        centerRadius="130px"
        startOffsetAngle={30}
        centerX={`${this.state.mouseX}px`}
        centerY={`${this.state.mouseY}px`}
      >
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ menu: false });
          }}
        >
          <p className="nonSelectable">Hatch</p>
        </Slice>

        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ menu: false });
          }}
        >
          <p className="nonSelectable">Cargo</p>
        </Slice>
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ menu: false });
          }}
        >
          <p className="nonSelectable">Hatch</p>
        </Slice>
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ menu: false });
          }}
        >
          <p className="nonSelectable">Cargo</p>
        </Slice>
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ menu: false });
          }}
        >
          <p className="nonSelectable">Hatch</p>
        </Slice>
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ menu: false });
          }}
        >
          <p className="nonSelectable">Cargo</p>
        </Slice>
      </PieMenu>
    ) : null;
  };
}

export default FieldIMG;
