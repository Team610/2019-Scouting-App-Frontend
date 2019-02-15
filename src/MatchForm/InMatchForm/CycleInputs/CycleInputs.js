import React, { Component } from "react";
import CycleInput from "./CycleInput";
import FieldIMG from "./field";

class CycleInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numCycles: 0
    };
    this.addCycle = this.addCycle.bind(this);
    this.getJSON = this.getJSON.bind(this);
    this.cycleRefs = [];
  }
  getJSON() {
    let arr = [];
    for (let i = 0; i < this.cycleRefs.length; i++) {
      arr.push(this.cycleRefs[i].current.getJSON().cycleDuration);
    }
    return {
      cycle_cargo_lv1: arr
    };
  }
  addCycle() {
    this.setState({
      numCycles: this.state.numCycles + 1
    });
  }
  render() {
    let cycles = [];
    this.cycleRefs = [];
    for (let i = 1; i <= this.state.numCycles; i++) {
      let cycleRef = React.createRef();
      cycles.push(<CycleInput key={i} cycleNum={i} ref={cycleRef} />);
      this.cycleRefs.push(cycleRef);
    }
    return (
      <div>
        {cycles.length > 0 ? (
          cycles
        ) : (
          <span>
            No cycles yet
            <br />
          </span>
        )}
        <button onClick={this.addCycle} type="button">
          Add cycle
        </button>
        <FieldIMG />
      </div>
    );
  }
}

export default CycleInputs;
