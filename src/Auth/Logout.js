import React, { Component } from 'react';

export default class Login extends Component {
	render() {
		return (
			<button onClick={this.props.logout} className="button">Log out</button>
		);
	}
}
