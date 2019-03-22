import React, { Component } from 'react';

export default class BlueSide extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCurBlueSide = this.getCurBlueSide.bind(this);
		this.state = { blueSide: 'Waiting for blue side...', value: '' };
	}
	componentDidMount() {
		this._isMounted = true;
		this.getCurBlueSide();
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	async getCurBlueSide() {
		let res = await fetch(`/api/settings/blueSide`);
		if (res.ok) {
			res = await res.json();
			if (res.success && this._isMounted)
				this.setState({ blueSide: res.blueSide })
		}
	}
	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	async handleSubmit() {
		const val = this.state.value.toLowerCase();
		if (val !== 'left' && val !== 'right') {
			alert(`Invalid value ${val}`);
			return;
		}
		let btn = document.getElementById('blueSide_submitBtn');
		btn.innerHTML = 'Submitting...';
		btn.setAttribute('disabled', 'true');
		let res = await fetch(`/api/settings/blueSide`, {
			method: 'POST',
			body: JSON.stringify({ side: val, user: this.props.user }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			res = await res.json();
			alert(res.success ? 'Successfully set blue side.' : 'Internal server error. Please contact the admins.');
		} else {
			alert('Unable to set blue side. Please try again.');
		}
		btn.innerHTML = 'Submit';
		btn.removeAttribute('disabled');
		this.getCurBlueSide();
	}
	render() {
		return (
			<div>
				<p>Current blue side: {this.state.blueSide}</p>
				<input
					type="text"
					onChange={this.handleChange}
					value={this.state.value} />
				<button onClick={this.handleSubmit} id='blueSide_submitBtn'>Submit</button>
				<br />
				<p>Please input 'left' or 'right'.</p>
			</div>
		);
	}
}
