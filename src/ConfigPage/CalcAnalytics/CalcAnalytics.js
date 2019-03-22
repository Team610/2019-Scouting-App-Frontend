import React, { Component } from 'react';

export default class CalcAnalytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	async handleSubmit() {
		const val = Number(this.state.value);
		if (val < -1 || val === 0 || Number.isNaN(val)) {
			alert(`Invalid team number ${val}`);
			return;
		}
		let btn = document.getElementById('calcAnalytics_submitBtn');
		btn.innerHTML = 'Submitting...';
		btn.setAttribute('disabled', 'true');
		let res = await fetch(`/api/v1/event/calcAnalytics/${val !== -1 ? val : ''}`);
		if (res.ok) {
			res = await res.json();
			if (!res.success) { //TODO: handle status of team not found
				alert('Internal server error. Please contact the admins.');
			} else {
				alert('Successfully calculated analytics.');
			}
		} else {
			alert('Unable to calculate analytics. Please try again.');
		}
		btn.innerHTML = 'Submit';
		btn.removeAttribute('disabled');
	}
	render() {
		return (
			<div>
				<p>Input team number</p>
				<input
					type="number"
					onChange={this.handleChange}
					value={this.state.value} />
				<button onClick={this.handleSubmit} id='calcAnalytics_submitBtn'>Submit</button>
				<p>*To calculate for all teams, input -1</p>
			</div>
		);
	}
}
