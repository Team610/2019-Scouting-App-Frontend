import React, { Component } from "react";
import TeamAnalyticsHeader from "./TeamAnalyticsHeader/teamAnalyticsHeader";
import OverallSection from "./OverallSection/overallSection";
import CyclesSection from "./CyclesSection/cyclesSection";
import PreGameSection from "./PreGameSection/preGameSection";
import EndGameSection from "./EndGameSection/endGameSection";
import DefenseSection from "./DefenseSection/defenseSection";
import CommentsSection from "./CommentsSection/commentsSection";

class TeamOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamNum: this.props.match.params.teamNum,
      dataAvailable: false
    };
  }
  async componentWillMount() {
    let data = await fetch(`/api/v1/stats/team/${this.state.teamNum}/agg`);
    data = await data.json();
    this.setState({
      dataAvailable: true,
      data: data[this.state.teamNum]
    });
  }
  render() {
    return (
      <div>
        <TeamAnalyticsHeader num={this.state.teamNum} />
        <OverallSection data={this.state.data} />
        <CyclesSection data={this.state.data} />
        <PreGameSection data={this.state.data} />
        <EndGameSection data={this.state.data} />
        <DefenseSection data={this.state.data} />
        <CommentsSection />
      </div>
    );
  }
}

export default TeamOverview;
