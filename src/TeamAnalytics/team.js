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
		let data = await fetch(`/stats/team/${this.state.teamNum}/agg`);
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
}

export default Team;
