import React, { Component } from 'react';
import SingleTeam from './TeamAnalytics';

export default class MultiTeamView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTeams: [],
			status: 'Team list loading...' //TODO: separate status codes and messages
		}
		this.getTeamList = this.getTeamList.bind(this);
		this.handleTeam = this.handleTeam.bind(this);
		this.checkTeam = this.checkTeam.bind(this);
	}
	async componentDidMount() {
		this._isMounted = true;
		this.teamList = await this.getTeamList();
		if (this._isMounted)
			this.setState({ status: 'Which team?' });
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	async getTeamList() {
		let res = await fetch(`/api/v1/event/getEventTeams`);
		if (!res.ok) {
			if (this._isMounted)
				this.setState({ status: new Error("Could not fetch team list. Please try again.") });
			return;
		}
		res = await res.json();
		return res;
	}

	checkTeam(num) {
		if (this.teamList) {
			for (let i = 0; i < this.teamList.length; i++) {
				if (num === Number(this.teamList[i]))
					return true;
			}
		}
		return false;
	}
	handleTeam(num) {
		num = Number(num);
		if (!this.checkTeam(num))
			return false;
		let teams = this.state.activeTeams;
		for (let i = 0; i < this.state.activeTeams.length; i++) {
			if (Number(this.state.activeTeams[i]) === num) {
				console.log(`remove ${num}`);
				teams.splice(i, 1);
				this.setState({ activeTeams: teams });
				return false;
			}
		}
		console.log(`add ${num}`);
		teams.splice(this.state.activeTeams.length, 0, num);
		this.setState({ activeTeams: teams });
	}

	render() {
		let teams = [];
		for (let i = 0; i < this.state.activeTeams.length; i++) {
			teams.push(
				<td key={i}><SingleTeam teamNum={this.state.activeTeams[i]} /></td>
			);
		}
		return (
			<div>
				{this.state.status !== 'Team list loading...' ?
					<TeamSelect
						teamList={this.teamList}
						activeTeams={this.state.activeTeams}
						handleTeam={this.handleTeam} /> :
					null}
				<table>
					<tbody>
						<tr>
							{teams}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

class TeamSelect extends Component {
	render() {
		const tList = this.props.teamList;
		const aList = this.props.activeTeams;
		let liList = [];
		for (let i = 0; i < tList.length; i++) {
			liList.push(
				<li key={tList[i]}>
					<button
						onClick={() => { this.props.handleTeam(tList[i]); }}
						className={`btn-link ${aList.includes(tList[i]) ? 'active' : ''}`}
						href='#'>{tList[i]}</button>
				</li>
			);
		}
		return (
			<ul>{liList}</ul>
		);
	}
}
