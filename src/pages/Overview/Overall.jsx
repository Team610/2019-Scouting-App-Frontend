import React, { Component } from "react";
import "./style.css";
class Overall extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  render() {
    var data = require("./info.json");
    var teamNumber = this.props.num;

    console.log(data);
    return (
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="style.css" />
        </head>
        <body>
          <div>
            <h1 class="comp">Overall</h1>
            <table>
              <tr>
                <th>Hatch</th>
                <th>Balls</th>
                <th>Climb</th>
              </tr>
              <tr>
                <th>
                  {data[610].hatch_lv3.num.avg} @ {data[610].hatch_lv3.time.avg}{" "}
                </th>
                <th>50%</th>
                <th>75%</th>
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

export default Overall;
