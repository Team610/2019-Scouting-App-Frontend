import React, { Component } from 'react';

export default class SetCurEvent extends Component {
	constructor(props) {
		super(props);
		this.getCurEvent = this.getCurEvent.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
		this.state = { event: 'Waiting for current event...', value: '' };
	}
	componentDidMount() {
		this._isMounted = true;
		this.getCurEvent();
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	async getCurEvent() {
		let res = await fetch(`/api/settings/curEvent`);
		if (res.ok) {
			res = await res.json();
			if (this._isMounted)
				this.setState({ event: res.event })
		}
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
		let btn = document.getElementById('curEvent_submitBtn');
		btn.innerHTML = 'Submitting...';
		btn.setAttribute('disabled', 'true');
		let res = await fetch(`/api/settings/curEvent`, {
			method: 'POST',
			body: JSON.stringify({ eventCode: val }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			res = await res.json();
			alert(res.success ? 'Successfully set current event.' : 'Internal server error. Please contact the admins.');
		} else {
			alert('Unable to set current event. Please try again.');
		}
		btn.innerHTML = 'Submit';
		btn.removeAttribute('disabled');
		this.getCurEvent();
	}
	async handleValidate() {
		let btn = document.getElementById('curEvent_validateBtn');
		btn.innerHTML = 'Validating...';
		btn.setAttribute('disabled', 'true');
		let res = await fetch(`/api/v1/event/validate`);
		if (res.ok) {
			res = await res.json();
			console.log(res.discrepancies);
			alert(res.success ? 'Successfully validated current event.' : 'Internal server error. Please contact the admins.');
		} else {
			alert('Unable to validate current event. Please try again.');
		}
		btn.innerHTML = 'Validate';
		btn.removeAttribute('disabled');
		this.getCurEvent();
	}

	render() {
		return (
			<div>
				<p>
					Current event: {this.state.event} &nbsp;
					<button onClick={this.handleValidate} id='curEvent_validateBtn'>Validate</button>
				</p>
				<p>Input event code</p>
				<input
					type="text"
					onChange={this.handleChange}
					value={this.state.value} />
				<button onClick={this.handleSubmit} id='curEvent_submitBtn'>Submit</button>
			</div>
		);
	}
}
