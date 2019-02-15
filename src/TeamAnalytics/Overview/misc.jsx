import React, { Component } from "react";
class Misc extends Component {
  constructor() {
    super();
    // this.state = [];
  }

  render() {
    return (
      <div>
        <h1 className="comp">
          <table className="header">
            <thead>
              <tr>
                <td className="name">Miscellanious</td>
              </tr>
            </thead>
          </table>
        </h1>
        <table>
          <tbody>
            <tr>
              <th>Total Defense Time</th>
              <th>100s</th>
            </tr>
            <tr>
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
}

export default Misc;
