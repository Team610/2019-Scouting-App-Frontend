import React, { Component } from "react";
class Endgame extends Component {
  constructor() {
    super();
    this.state = [];
  }

  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="style.css" />
        </head>
        <body>
          <div>
            <h1 class="comp">Endgame</h1>
            <table>
              <tr>
                <th />
                <th>Rate</th>
                <th>Time</th>
              </tr>
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
                  <button class="matchdata">View Match Data</button>
                </th>
              </tr>
            </table>
          </div>
        </body>
      </html>
    );
  }
}

export default Endgame;
