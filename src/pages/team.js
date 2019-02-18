import React, { Component } from "react";
import Overall from "./Overview/Overall";
import Cycles from "./Overview/Cycles";
import Endgame from "./Overview/Endgame";
import Misc from "./Overview/misc";
import Header from "./Overview/TeamHeader";
import TeamHeader from "./Overview/TeamHeader";
import Accordion from './Overview/Accordion';

class Team extends Component {
  render() {
    return (
      <table>
          <tr>
            <th>
              <div>
                <TeamHeader num={this.props.match.params.teamNum} />
                <Accordion allowMultipleOpen>
                  <div label = "Overall" isOpen><Overall num={this.props.match.params.teamNum} /></div>
                  <div label = "Cycles" isOpen><Cycles /></div>
                  <div label = "Endgame" isOpen><Endgame /></div>
                  <div label = "Miscellaneous" isOpen><Misc /></div>
                </Accordion>
              </div>
            </th>
            <th>
              <div>
                <TeamHeader num={this.props.match.params.teamNum} />
                <Accordion allowMultipleOpen>
                  <div label = "Overall" isOpen><Overall num={this.props.match.params.teamNum} /></div>
                  <div label = "Cycles" isOpen><Cycles /></div>
                  <div label = "Endgame" isOpen><Endgame /></div>
                  <div label = "Miscellaneous" isOpen><Misc /></div>
                </Accordion>
              </div>
            </th>
          </tr>
      </table>
    );
  }
}

export default Team;
