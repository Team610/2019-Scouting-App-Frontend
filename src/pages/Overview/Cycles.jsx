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
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="style.css" />
        </head>
        <body>
          <div>
            <h1 class="comp">
              <table class="header">
                <tr>
                  <td class="name">Cycles</td>
                  <td class="b1">
                    <button class="b11" onClick={() => this.teleop()}>
                      TO
                    </button>
                  </td>
                  <td class="b2">
                    <button class="b21" onClick={() => this.sandstorm()}>
                      SS{" "}
                    </button>
                  </td>
                </tr>
              </table>
            </h1>
            <table>
              <tr>
                <th />
                <th>Hatches</th>
                <th>Balls</th>
              </tr>
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
                  <button class="matchdata">View Match Data</button>
                </th>
              </tr>
            </table>
          </div>
        </body>
      </html>
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
