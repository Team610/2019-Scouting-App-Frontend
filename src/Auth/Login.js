import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

export default class Login extends Component {
	render() {
		return (
			<GoogleLogin
				clientId={this.props.clientId}
				buttonText="Log in"
				onSuccess={this.props.googleResponse}
				onFailure={this.props.onFail} />
		);
	}
}
