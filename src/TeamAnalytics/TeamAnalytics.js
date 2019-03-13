import React, { Component, Fragment } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/TeamAnalyticsHeader';
import OverallSection from './OverallSection/OverallSection';
import CyclesSection from './CyclesSection/CyclesSection';
import PreGameSection from './PreGameSection/PreGameSection';
import EndGameSection from './EndGameSection/EndGameSection';
import DefenseSection from './DefenseSection/DefenseSection';
import CommentsSection from './CommentsSection/CommentsSection';
import Accordion from './CollapsibleContainer/Accordion';
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
		this._isMounted = true;
		this.teamList = await this.getTeamList();
		if (this._isMounted)
			this.setState({ teamListAvailable: true });
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	async setTeamNum(num) {
		if (num !== this.state.teamNum) {
			if (this._isMounted)
				this.setState({ teamNum: num, dataAvailable: false });
			let res = await fetch(`/api/v1/stats/team/${num}/agg`);
			if (!res.ok) {
				if (this._isMounted)
					this.setState({ err: new Error("Could not fetch team data. Please try again.") });
				return;
			}
			res = await res.json();
			this.data = res[num];
			console.log(this.data);
			console.log(`set to team ${this.state.teamNum}`);
			if (this._isMounted)
				this.setState({ dataAvailable: true });
		}
	}
	async getTeamList() {
		let res = await fetch(`/api/v1/event/getEventTeams`);
		if (!res.ok) {
			if (this._isMounted)
				this.setState({ err: new Error("Could not fetch team list. Please try again.") });
			return;
		}
		res = await res.json();
		console.log("got team list");
		return res;
	}
	render() {
		if (this.state.err) {
			console.log(this.state.err.message);
			return (
				<div>
					<p>Could not load data.</p>
					<p>{this.state.err.message}</p>
				</div>
			);
		}
		if (!this.state.teamListAvailable) {
			console.log('loading team list');
			return (
				<div>
					Loading...
				</div>
			);
		}
		if (this.state.teamNum === -1) {
			console.log('no team selected');
			return (
				<div>
					<TeamSelect teamList={this.teamList} setTeamNum={this.setTeamNum} />
					<p>Please select a team.</p>
				</div>
			);
		} else if (!this.state.dataAvailable) {
			console.log(`loading team ${this.state.teamNum}`);
			return (
				<div>
					<TeamSelect teamList={this.teamList} setTeamNum={this.setTeamNum} /><br />
					Data for Team {this.state.teamNum} loading...
				</div>
			);
		} else {
			console.log(`loaded team ${this.state.teamNum}`);
			return (
				<Fragment>
					<TeamSelect teamList={this.teamList} teamNum={this.state.teamNum} setTeamNum={this.setTeamNum} /><br />
					<TeamAnalyticsHeader teamNum={this.state.teamNum} />
					<Accordion>
						<OverallSection label="Overall" teamNum={this.state.teamNum} data={this.data} />
						<CyclesSection label="Cycles" teamNum={this.state.teamNum} data={this.data} />
						<PreGameSection label="Preloads" teamNum={this.state.teamNum} data={this.data} />
						<EndGameSection label="Climbs" teamNum={this.state.teamNum} data={this.data} />
						<DefenseSection label="Defense" teamNum={this.state.teamNum} data={this.data} />
						<CommentsSection label="Comments" teamNum={this.state.teamNum} data={this.data} />
					</Accordion>
				</Fragment>
			);
		}
	}
}

class TeamSelect extends Component {
	render() {
		let json = this.props.teamList;
		let liList = [];
		let btnClass = 'btn-link';
		for (let i = 0; i < json.length; i++) {
			liList.push(
				<li key={json[i]}>
					<button
						onClick={() => { this.props.setTeamNum(json[i]); }}
						className={`${btnClass} ${json[i] === this.props.teamNum ? 'active' : ''}`}
						href='#'>{json[i]}</button>
				</li>
			);
		}
		return (
			<Fragment>
				<h2>Teams</h2>
				<ul>{liList}</ul>
			</Fragment>
		);
	}
}
