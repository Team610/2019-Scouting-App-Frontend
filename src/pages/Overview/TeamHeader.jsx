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
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="style.css" />
        </head>
        <div>
          <table class="head">
            <tr>
              <td />
              <td>
                <h1 class="h">{teamNumber} Data Page</h1>
              </td>
              <td />
            </tr>
          </table>
        </div>
      </html>
    );
  }
}

export default TeamHeader;
