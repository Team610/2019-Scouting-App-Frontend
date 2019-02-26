import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/teamAnalyticsHeader';
import OverallSection from './OverallSection/overallSection';
import CyclesSection from './CyclesSection/cyclesSection';
import PreGameSection from './PreGameSection/preGameSection';
import EndGameSection from './EndGameSection/endGameSection';
import DefenseSection from './DefenseSection/defenseSection';
import CommentsSection from './CommentsSection/commentsSection';
import './style.css';

class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataAvailable:false
		}
		this.teamNum = this.props.match.params.teamNum
	}
	async componentWillMount() {
		let data = await fetch(`/api/v1/stats/team/${this.teamNum}/agg`);
		data = await data.json();
		this.setState({
			dataAvailable: true,
			data: data[this.teamNum]
		});
	}
    render() {
		console.log(JSON.stringify(this.state.data));
		if(!this.state.dataAvailable) {
			return(
				<div>
					<TeamAnalyticsHeader num={this.teamNum} />
					<p>Data loading...</p>
				</div>
			);
		}
        return (
            <div>
				<TeamAnalyticsHeader teamNum={this.teamNum} />
				<OverallSection data={this.state.data} />
				<CyclesSection data={this.state.data} />
				<PreGameSection data={this.state.data} />
				<EndGameSection data={this.state.data} />
				<DefenseSection data={this.state.data} />
				<CommentsSection data={this.state.data} />
            </div>
        );
    }
}

export default Team;
