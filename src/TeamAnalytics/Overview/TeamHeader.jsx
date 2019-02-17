import React, { Component } from "react";
import "./style.css";
class TeamHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    var teamNumber = this.props.num;
    return (
      <div>
        <table className="head">
          <thead>
            <tr>
              <td />
              <td>
                <h1 className="h">{teamNumber} Data Page</h1>
              </td>
              <td />
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default TeamHeader;
