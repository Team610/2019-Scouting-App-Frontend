import React, { Component } from 'react';

export default class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.handleTeamChange = this.handleTeamChange.bind(this);
		this.handleMatchChange = this.handleMatchChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { teamNum: '', matchNum: '' };
	}
	handleTeamChange(e) {
		this.setState({ teamNum: e.target.value });
	}
	handleMatchChange(e) {
		this.setState({ matchNum: e.target.value });
	}
	async handleSubmit() {
		const teamNum = this.state.teamNum;
		const matchNum = this.state.matchNum;
		let btn = document.getElementById('createForm_submitBtn');
		btn.innerHTML = 'Submitting...';
		btn.setAttribute('disabled', 'true');
		let res = await fetch(`/api/v1/event/createForm`, {
			method: 'POST',
			body: JSON.stringify({ teamNum: teamNum, matchNum: matchNum, user: this.props.user }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			res = await res.json();
			alert(res.success ? 'Successfully created form.' : 'Internal server error. Please contact the admins.');
		} else {
			alert('Unable to create form. Please try again.');
		}
		btn.innerHTML = 'Submit';
		btn.removeAttribute('disabled');
	}
	render() {
		return (
			<div>
				<p>Input team #</p>
				<input
					type="text"
					onChange={this.handleTeamChange}
					value={this.state.teamNum} />
				<p>Input match #</p>
				<input
					type="text"
					onChange={this.handleMatchChange}
					value={this.state.matchNum} />
				<button onClick={this.handleSubmit} id='createForm_submitBtn'>Submit</button>
			</div>
		);
	}
}
