import React, { Component } from "react";
class Endgame extends Component {
  constructor() {
    super();
    // this.state = [];
  }

  render() {
    return (
      <div>
        <h1 className="comp">Endgame</h1>
        <table>
          <thead>
            <tr>
              <th />
              <th>Rate</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Level 3</th>
              <th>100%</th>
              <th>10s</th>
            </tr>
            <tr>
              <th>Level 2</th>
              <th>50%</th>
              <th>2s</th>
            </tr>
            <tr>
              <th>Level 1</th>
              <th>50%</th>
              <th>2s</th>
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
}

export default Endgame;
