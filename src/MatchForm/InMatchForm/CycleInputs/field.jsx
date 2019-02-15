import React, { Component } from "react";
import PieMenu, { Slice } from "react-pie-menu";
const topHP = [110, 580, 205, 650];
const bottomHP = [110, 800, 205, 875];
const topRocket = [310, 440, 355, 485];
const bottomRocket = [310, 710, 355, 750];
const cargoShip = [325, 700, 425, 755];
const HAB = [110, 665, 205, 800];

class FieldIMG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseX: 0,
      mouseY: 0,
      menu: false,
      secondStage: false,
      close: false,
      intake: true,
      topOffset: 0
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
          </div>
        </div>
      </html>
    );
  }

  getClickPosition = e => {
    this.setState({ mouseX: e.clientX });
    this.setState({ mouseY: e.clientY + 125 });
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
    if (this.checkBounds(topRocket) && this.state.intake === true) {
      return this.returnMenuTwo();
    }
    if (this.checkBounds(bottomRocket) && this.state.intake === true) {
      return this.returnMenuTwo();
    } else if (
      this.checkBounds(cargoShip) === true &&
      this.state.intake === true
    ) {
      this.setState({ intake: false });
    } else if (
      this.checkBounds(HAB) == false &&
      this.checkBounds(topHP) === false &&
      this.checkBounds(bottomHP) === false &&
      this.checkBounds(topRocket) === false &&
      this.checkBounds(bottomRocket) == false &&
      this.checkBounds(cargoShip) == false &&
      this.state.intake === false
    ) {
      return this.returnMenuOne();
    } else if (this.checkBounds(topHP)) {
      return this.returnMenuOne();
    } else if (this.checkBounds(bottomHP)) {
      return this.returnMenuOne();
    }
  };

  returnMenuOne = () => {
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
            this.setState({ intake: true });
          }}
        >
          <p className="nonSelectable">Hatch</p>
        </Slice>
        <div />
        <Slice
          className="nonSelectable"
          onSelect={() => {
            this.setState({ menu: false });
            this.setState({ intake: true });
          }}
        >
          <p className="nonSelectable">Cargo</p>
        </Slice>
      </PieMenu>
    ) : null;
  };

  returnMenuTwo = () => {
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
            onSelect={() => {
              this.setState({ menu: false });
              this.setState({ intake: false });
            }}
          >
            <p className="nonSelectable">Level 1</p>
          </Slice>
          <Slice
            className="nonSelectable"
            onSelect={() => {
              this.setState({ menu: false });
              this.setState({ intake: false });
            }}
          >
            <p className="nonSelectable">Level 2</p>
          </Slice>

          <Slice
            className="nonSelectable"
            onSelect={() => {
              this.setState({ menu: false });
              this.setState({ intake: false });
            }}
          >
            <p className="nonSelectable">Level 3</p>
          </Slice>
        </PieMenu>
      </html>
    ) : null;
  };

  setTopOffset = () => {
    // this.setState({ topOffset:});
  };
}

export default FieldIMG;
