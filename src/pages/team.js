import React, { Component } from "react";
import Overall from "./Overview/Overall";
import Cycles from "./Overview/Cycles";
import Endgame from "./Overview/Endgame";
import Misc from "./Overview/misc";
import header from "./Overview/TeamHeader";
import TeamHeader from "./Overview/TeamHeader";

class Team extends Component {
  render() {
    return (
      <div>
        <TeamHeader num={this.props.match.params.teamNum} />
        <Overall num={this.props.match.params.teamNum} />
        <Cycles />
        <Endgame />
        <Misc />
      </div>
    );
  }
}

export default Team;
