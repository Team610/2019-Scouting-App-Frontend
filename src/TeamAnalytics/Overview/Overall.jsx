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
      <div>
        <h1 className="comp">Overall</h1>
        <table className="analyticsTable">
          <thead>
            <tr>
              <th>Hatch</th>
              <th>Balls</th>
              <th>Climb</th>
            </tr>
          </thead>
          <tbody>
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
                <button className="matchdata">View Match Data</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Overall;
