import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/teamAnalyticsHeader';
import OverallSection from './OverallSection/OverallSection';
import CyclesSection from './CyclesSection/CyclesSection';
import PreGameSection from './PreGameSection/PreGameSection';
import EndGameSection from './EndGameSection/EndGameSection';
import DefenseSection from './DefenseSection/DefenseSection';
import CommentsSection from './CommentsSection/CommentsSection';
import './style.css';

class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataAvailable:false
		}
		this.teamNum = this.props.match.params.teamNum;
	}
	async componentDidMount() {
		let data = await fetch(`/api/v1/stats/team/${this.teamNum}/agg`);
		data = await data.json();
		console.log(data);
		if (!data) {
			this.setState({
				dataAvailable: false,
				err: true
			});
		} else {
			this.setState({
				dataAvailable: true,
				data: data[this.teamNum]
			});
		}
	}
    render() {
		if(this.state.err) {
			return(
				<div>
					<p>Team not found</p>
				</div>
			)
		}
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
