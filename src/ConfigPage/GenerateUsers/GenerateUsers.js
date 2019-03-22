import React, { Component } from 'react';

export default class GenerateUsers extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { value: '' };
	}
	async handleSubmit() {
		let btn = document.getElementById('genUsers_submitBtn');
		btn.innerHTML = 'Doing...';
		btn.setAttribute('disabled', 'true');
		let res = await fetch(`/api/settings/userGen`);
		if (res.ok) {
			res = await res.json();
			alert(res.success ? 'Successfully generated users.' : 'Internal server error. Please contact the admins.');
		} else {
			alert('Unable to generate users. Please try again.');
		}
		btn.innerHTML = 'Do it';
		btn.removeAttribute('disabled');
	}
	render() {
		return (
			<div>
				<br />
				<button onClick={this.handleSubmit} id='genUsers_submitBtn'>Do it</button>
			</div>
		);
	}
}
