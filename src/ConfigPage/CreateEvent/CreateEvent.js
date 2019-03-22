import React, { Component } from 'react';

export default class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = { value: '' };
	}
	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	async handleSubmit() {
		const val = this.state.value;
		if (Number(val.substring(0, 4)) < 2000) {
			alert(`Invalid event code ${val}`);
			return;
		}
		let btn = document.getElementById('createEvent_submitBtn');
		btn.innerHTML = 'Submitting...';
		btn.setAttribute('disabled', 'true');
		let res = await fetch(`/api/v1/event/createEvent`, {
			method: 'POST',
			body: JSON.stringify({ eventCode: val, user: this.props.user }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			res = await res.json();
			alert(res.success ? 'Successfully created event.' : 'Internal server error. Please contact the admins.');
		} else {
			alert('Unable to create event. Please try again.');
		}
		btn.innerHTML = 'Submit';
		btn.removeAttribute('disabled');
	}
	render() {
		return (
			<div>
				<p>Input event code</p>
				<input
					type="text"
					onChange={this.handleChange}
					value={this.state.value} />
				<button onClick={this.handleSubmit} id='createEvent_submitBtn'>Submit</button>
			</div>
		);
	}
}
