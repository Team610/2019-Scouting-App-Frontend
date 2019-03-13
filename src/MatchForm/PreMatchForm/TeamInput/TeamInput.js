import React, { Component } from 'react';

export default class TeamInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.loadData ? this.props.data.teamNum : '',
			alliance: this.props.loadData ? this.props.data.alliance : '',
			teamsLoaded: false
		}
		this.selectTeam = this.selectTeam.bind(this);
		this.renderTeamBtns = this.renderTeamBtns.bind(this);
		this.getTeams = this.getTeams.bind(this);
		this.getJSON = this.getJSON.bind(this);

		this.getTeams();
	}
	getJSON() {
		return ({
			teamNum: this.state.value,
			alliance: this.state.alliance
		});
	}

	selectTeam(teamNum, pos) {
		this.props.updateTeamNum(teamNum);
		this.setState({
			value: teamNum,
			alliance: pos < 3 ? 'red' : 'blue'
		});
	}
	async getTeams() {
		try {
			console.log(`/api/v1/matches/${this.props.data.matchNum}/teams`);
			let teamListRaw = await fetch(`/api/v1/matches/${this.props.data.matchNum}/teams`);
			if (teamListRaw.ok) {
				this.teamList = await teamListRaw.json();
				if (this.teamList.success === false) {
					this.setState({
						teamsLoaded: false,
						cannotLoad: true
					});
				} else {
					this.setState({
						teamsLoaded: true
					});
				}
				this.renderTeamBtns('');
			} else {
				this.setState({
					teamsLoaded: false,
					cannotLoad: true
				})
			}
		} catch (err) {
			console.log("could not load teams");
			console.log(err.stack);
			this.setState({
				teamsLoaded: false,
				cannotLoad: true
			});
		}
	}
	renderTeamBtns(activeTeam) {
		let teams = [];
		for (let i = 0; i < this.teamList.length; i++) {
			teams[i] = (
				<button type="button"
					key={i}
					onClick={() => { this.selectTeam(this.teamList[i], i); }}
					className={this.teamList[i] === activeTeam ? 'btn-active' : 'btn-inactive'}>
					{this.teamList[i]}
				</button>
			);
		}
		return teams;
	}

	render() {
		if (this.state.teamsLoaded) {
			let teamBtns = this.renderTeamBtns(this.state.value);
			return (
				<div>
					Team num: &nbsp;
                    {teamBtns}
				</div>
			);
		} else if (this.state.cannotLoad) {
			return (
				<div>
					Cannot load team list.
				</div>
			)
		} else {
			return (
				<div>
					Loading team list...
                </div>
			);
		}
	}
}
