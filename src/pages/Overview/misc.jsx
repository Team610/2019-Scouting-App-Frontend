import React, { Component } from "react";
class Misc extends Component {
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
            <h1 class="comp">
              <table class="header">
                <tr>
                  <td class="name">Miscellanious</td>
                </tr>
              </table>
            </h1>
            <table>
              <tr>
                <th>Total Defense Time</th>
                <th>100s</th>
              </tr>
              <tr>
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

export default Misc;
