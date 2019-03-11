import React, { Component } from 'react';
import MatchFormHeader from './MatchFormHeader/MatchFormHeader';
import AllPreMatchForm from './PreMatchForm/AllPreMatchForm';
import InMatchForm from './InMatchForm/FieldInput/FieldInput'; //InMatchForm component itself is not used at all!
import PostMatchForm from './PostMatchForm/PostMatchForm';
import { Prompt, Redirect } from 'react-router';
import SubmitError from './SubmitError';
import "./style.css";
let fieldConfig = require('../config.json');

export default class AllMatchForm extends Component { //TODO: figure out how to avoid duplicate code between MatchForm.js and AllMatchForm.js
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.saveToLocal = this.saveToLocal.bind(this);
		this.getNextView = this.getNextView.bind(this);
		this.collectCurView = this.collectCurView.bind(this);
		this.discardForm = this.discardForm.bind(this);
	

		this.preMatchRef = React.createRef();
		this.inMatchRef = React.createRef();
		this.postMatchRef = React.createRef();
		this.viewRefs = [this.preMatchRef, this.inMatchRef, this.postMatchRef];

		let form = localStorage.getItem("form");
		if (form) {
			this.data = JSON.parse(form);
			this.data.user = this.props.user;
			let view = localStorage.getItem("lastView");
			this.state = {
				matchView: view,
				onSavedView: true,
				block: true
			};
		} else {
			this.data = {
				matchNum: this.props.matchNum,
				user: this.props.user
			};
			this.state = {
				matchView: 'preMatch',
				onSavedView: false,
				block: true
			}
		}
	}
	componentDidMount() {
		window.addEventListener("beforeunload",	this.saveToLocal);
		this.interval = window.setInterval(this.saveToLocal, 10000);
	}
	componentWillUnmount() {
		if (!this.state.redirect)
			this.saveToLocal();
		window.removeEventListener("beforeunload", this.saveToLocal);
		window.clearInterval(this.interval);
	}

	async getNextView() {
		this.collectCurView();
		if (this.state.matchView === 'preMatch') {
			this.setState({ matchView: 'inMatch', onSavedView: false });
		} else if (this.state.matchView === 'inMatch') {
			this.setState({ matchView: 'postMatch', onSavedView: false });
		} else if (this.state.matchView === 'postMatch') {
			let res = await this.submitForm();
			if (res.status > 0) {
				throw new SubmitError("Could not sumbit form. Please try again.");
			}
		} else {
			alert('Current match view not defined!');
		}
	}
	collectCurView() {
		let view = this.state.matchView;
		let ref = this[`${view}Ref`];
		let viewJSON = ref.current.getJSON();
		for (let key in viewJSON) {
			this.data[key] = viewJSON[key];
		}
	}
	saveToLocal() {
		this.collectCurView();
		localStorage.setItem("form", JSON.stringify(this.data));
		localStorage.setItem("lastView", this.state.matchView);
	}
	discardForm() {
		let discard = window.confirm('Discard the form?');
		if (discard) {
			localStorage.removeItem('form');
			localStorage.removeItem('lastView');
			this.setState({
				redirect: true,
				block: false
			});
		}
	}
	async submitForm() {
		// console.log(JSON.stringify(this.data));
		try {
			console.log("trying to submit form");
			let res = await fetch('/api/v1/submitForm', {
				method: 'POST',
				body: JSON.stringify(this.data),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (!res.ok) {
				console.log("could not submit form - !res.ok block");
				throw new SubmitError("Could not sumbit form. Please try again.");
			}
			localStorage.removeItem("form");
			localStorage.removeItem("lastView");
			console.log("successfully submitted");
		} catch (err) {
			console.log("could not submit form - catch block");
			console.log(err.stack);
			return { 'status': 1, 'message': 'Could not submit form. Please try again.' };
		}
		this.setState({
			redirect: true,
			block: false
		});
		return { 'status': 0, message: 'success' };
	}

	render() {
		console.log("Current match view: " + this.state.matchView);
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
		if (this.state.matchView === 'preMatch') {
			return (
				<div>
					<Header block={this.state.block} matchNum={this.data.matchNum} teamNum={this.data.teamNum} />
					<AllPreMatchForm
						callNext={this.getNextView}
						matchNum={this.data.matchNum}
						data={this.state.onSavedView ? this.data : false}
						ref={this.preMatchRef} />
				</div>
			);
		} else if (this.state.matchView === 'inMatch') {
			return (
				<div>
					<Header block={this.state.block} matchNum={this.data.matchNum} teamNum={this.data.teamNum} />
					<InMatchForm
						callNext={this.getNextView}
						alliance={this.data.alliance}
						blueSide={fieldConfig.blueSide}
						robotPreload={this.data.robot_preload}
						data={this.state.onSavedView ? this.data : false}
						ref={this.inMatchRef} />
				</div>
			);
		} else if (this.state.matchView === 'postMatch') {
			return (
				<div>
					<Header block={this.state.block} matchNum={this.data.matchNum} teamNum={this.data.teamNum} />
					<PostMatchForm
						callNext={this.getNextView}
						data={this.state.onSavedView ? this.data : false}
						discard={this.discardForm}
						ref={this.postMatchRef} />
				</div>
			);
		}
		return (
			<div>
				<MatchFormHeader matchNum={this.data.matchNum} teamNum='' /><hr />
				Loading...
			</div>
		);
	}
}

class Header extends Component {
	render() {
		return (
			<React.Fragment>
				<Prompt
					when={this.props.block}
					message={location =>
						`Are you sure you want to go to ${location.pathname} ?`
					}
				/>
				<MatchFormHeader matchNum={this.props.matchNum} teamNum={this.props.teamNum} /> <hr />
			</React.Fragment>
		);
	}
}
