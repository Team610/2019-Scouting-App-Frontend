import React, { Component } from "react";
class Cycles extends Component {
  constructor() {
    super();
    this.state = {
      toggle: "true",
      values: [[1, 2], [3, 4], [1, 2], [3, 4]]
    };
  }
  render() {
    return (
      <div>
        <h1 className="comp">
          <table className="header">
            <thead>
              <tr>
                <td className="name">Cycles</td>
                <td className="b1">
                  <button className="b11" onClick={() => this.teleop()}>
                    TO
                  </button>
                </td>
                <td className="b2">
                  <button className="b21" onClick={() => this.sandstorm()}>
                    SS{" "}
                  </button>
                </td>
              </tr>
            </thead>
          </table>
        </h1>
        <table>
          <thead>
            <tr>
              <th />
              <th>Hatches</th>
              <th>Balls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Level 3</th>
              <th>{this.state.values[0][0]}</th>
              <th>{this.state.values[0][1]}</th>
            </tr>
            <tr>
              <th>Level 2</th>
              <th>{this.state.values[1][0]}</th>
              <th>{this.state.values[1][1]}</th>
            </tr>
            <tr>
              <th>Level 1</th>
              <th>{this.state.values[2][0]}</th>
              <th>{this.state.values[2][1]}</th>
            </tr>
            <tr>
              <th>Ship</th>
              <th>{this.state.values[3][0]}</th>
              <th>{this.state.values[3][1]}</th>
            </tr>
            <tr>
              <th />
              <th />
              <th>
                <button className="matchdata">View Match Data</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  teleop = () => {
    this.setState({ values: [[1, 2], [3, 4], [1, 2], [3, 4]] });
    console.log(this.state.toggle);
  };

  sandstorm = () => {
    this.setState({ values: [[3, 4], [1, 2], [3, 4], [1, 2]] });
    console.log(this.state.toggle);
  };
}

export default Cycles;
