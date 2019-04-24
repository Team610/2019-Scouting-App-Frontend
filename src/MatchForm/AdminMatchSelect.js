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
		let input = document.getElementById('matchNumInput').value;
		if (Number.isNaN(Number(input))) {
			if ((input.charAt(0) === 'Q' || input.charAt(0) === 'S' || input.charAt(0) === 'F') && (input.charAt(2) === '-')) {
				this.setState({ matchNum: input });
			} else {
				alert("Text format not recognized!");
			}
		} else {
			if (Number(input) < 200 && Number(input) > 0) {
				this.setState({ matchNum: input });
			} else {
				alert("Match number is out of range!");
			}
		}
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
					<label>Match num: <input type="text" id="matchNumInput" /></label>
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
