<<<<<<< HEAD
import React, { Component } from "react";
import Overall from "./Overview/Overall";
import Cycles from "./Overview/Cycles";
import Endgame from "./Overview/Endgame";
import Misc from "./Overview/misc";
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
=======
import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/teamAnalyticsHeader';
import OverallSection from './OverallSection/overallSection';
import CyclesSection from './CyclesSection/cyclesSection';
import PreGameSection from './PreGameSection/preGameSection';
import EndGameSection from './EndGameSection/endGameSection';
import DefenseSection from './DefenseSection/defenseSection';
import CommentsSection from './CommentsSection/commentsSection';

class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamNum: this.props.match.params.teamNum,
			dataAvailable:false
		}
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
		console.log(this.state.data);
		if(!this.state.dataAvailable) {
			return(
				<div>
					<TeamAnalyticsHeader num={this.state.teamNum} />
					<p>Data loading...</p>
				</div>
			);
		}
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
>>>>>>> feature/skeleton
}

export default Team;
