import React, { Component } from 'react';
import MatchForm from './MatchForm';

export default class AllMatchSelect extends Component {
	constructor(props) {
		super(props);
		let form = localStorage.getItem("form");
		this.state = { matchNum: form ? JSON.parse(form).matchNum : null };
		this.selectMatchNum = this.selectMatchNum.bind(this);
		this.getMatchTeamNums = this.getMatchTeamNums.bind(this);
	}
	selectMatchNum() {
		let input = document.getElementById('matchNumInput');
		this.setState({ matchNum: input.value });
	}
	getMatchTeamNums() {
		return {
			matchNum: this.state.matchNum,
			teamNum: '',
			alliance: ''
		}
	}
	render() {
		if (!this.state.matchNum) {
			return (
				<div>
					<br />
					<label>Match num: <input type="number" id="matchNumInput" min="1" max="80" /></label>
					<button onClick={this.selectMatchNum}>Submit</button>
				</div>
			);
		} else {
			return (
				<MatchForm
					isScout={false}
					isAdmin={true}
					user={this.props.user}
					getMatchTeamNums={this.getMatchTeamNums} />
			);
		}
	}
}
