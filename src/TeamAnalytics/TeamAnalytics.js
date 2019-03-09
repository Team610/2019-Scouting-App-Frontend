import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/TeamAnalyticsHeader';
import OverallSection from './OverallSection/OverallSection';
import CyclesSection from './CyclesSection/CyclesSection';
import PreGameSection from './PreGameSection/PreGameSection';
import EndGameSection from './EndGameSection/EndGameSection';
import DefenseSection from './DefenseSection/DefenseSection';
import CommentsSection from './CommentsSection/CommentsSection';
import './style.css';

export default class TeamAnalytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamNum: -1,
			dataAvailable: false,
			teamListAvailable: false
		}
		this.setTeamNum = this.setTeamNum.bind(this);
		this.getTeamList = this.getTeamList.bind(this);
	}
	async componentDidMount() {
		this.teamList = await this.getTeamList();
		this.setState({
			teamListAvailable: true
		});
	}
	async setTeamNum(num) {
		if(num !== this.state.teamNum) {
			this.setState({
				teamNum: num,
				dataAvailable: false
			});
			let res = await fetch(`/api/v1/stats/team/${num}/agg`);
			res = await res.json();
			this.data = res[num];
			console.log(this.data);
			console.log(`set to team ${this.state.teamNum}`);
			this.setState({
				dataAvailable: true
			});
		}
	}
	async getTeamList() {
		let res = await fetch(`/api/v1/event/getEventTeams`);
		res = await res.json();
		console.log("got team list");
		return res;
	}
	render() {
		if(!this.state.teamListAvailable) {
			console.log('loading team list');
			return(
				<div>
					Loading...
				</div>
			);
		}
		if(this.state.teamNum===-1) {
			console.log('no team selected');
			return(
				<div>
					<TeamSelect teamList={this.teamList} setTeamNum={this.setTeamNum} />
					<p>Please select a team.</p>
				</div>
			);
		} else if(!this.state.dataAvailable) {
			console.log(`loading team ${this.state.teamNum}`)
			return(
				<div>
					<TeamSelect teamList={this.teamList} setTeamNum={this.setTeamNum} /><br/>
					Data for Team {this.state.teamNum} loading...
				</div>
			);
		} else {
			console.log(`loaded team ${this.state.teamNum}`)
			return(
				<div>
					<TeamSelect teamList={this.teamList} setTeamNum={this.setTeamNum} /><br/>
					<TeamAnalyticsHeader teamNum={this.state.teamNum} />
					<OverallSection teamNum={this.state.teamNum} data={this.data} />
					<CyclesSection teamNum={this.state.teamNum} data={this.data} />
					<PreGameSection teamNum={this.state.teamNum} data={this.data} />
					<EndGameSection teamNum={this.state.teamNum} data={this.data} />
					<DefenseSection teamNum={this.state.teamNum} data={this.data} />
					<CommentsSection teamNum={this.state.teamNum} data={this.data} />
				</div>
			);
		}
	}
}

class TeamSelect extends Component {
	constructor(props) {
		super(props);
		this.liList = [];
		let json = this.props.teamList;
		for(let i=0; i<json.length; i++) {
			this.liList.push(
				<li key={json[i]}>
					<button onClick={() => {this.props.setTeamNum(json[i]);}}>{json[i]}</button>
				</li>
			);
		}
	}
	render() {
		return (
			<React.Fragment>
				<h2>Teams</h2>
				<ul>{this.liList}</ul>
			</React.Fragment>
		);
	}
}
