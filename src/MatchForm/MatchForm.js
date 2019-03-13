import React, { Component } from 'react';
import SubmitError from './SubmitError';
import { Redirect, Prompt } from 'react-router';
import MatchFormHeader from './MatchFormHeader/MatchFormHeader';
import PreMatchForm from './PreMatchForm/PreMatchForm';
import InMatchForm from './InMatchForm/FieldInput/FieldInput'; //InMatchForm component itself is not used at all!
import PostMatchForm from './PostMatchForm/PostMatchForm';
import './style.css';
let fieldConfig = require('../config.json');

export default class MatchForm extends Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.saveToLocal = this.saveToLocal.bind(this);
		this.getNextView = this.getNextView.bind(this);
		this.collectCurView = this.collectCurView.bind(this);
		this.discardForm = this.discardForm.bind(this);

		this.viewList = ['PreMatch', 'InMatch', 'PostMatch'];
		this.viewRefs = [];
		for (let view of this.viewList) {
			this[`${view}Ref`] = React.createRef();
			this.viewRefs.push(this[`${view}Ref`]);
		}
		this.formList = {
			PreMatch: PreMatchForm,
			InMatch: InMatchForm,
			PostMatch: PostMatchForm
		}

		let form = localStorage.getItem("form");
		if (form) {
			this.data = JSON.parse(form);
			let view = localStorage.getItem("lastView");
			this.state = {
				matchView: Number(view),
				onSavedView: true,
				isLoading: false,
				block: true
			};
		} else {
			this.data = { user: this.props.user, blueSide: fieldConfig.blueSide };
			this.state = {
				matchView: 0,
				onSavedView: false,
				isLoading: true,
				block: true
			}
		}
	}
	async componentDidMount() {
		this._isMounted = true;
		window.addEventListener("beforeunload", this.saveToLocal);
		this.interval = window.setInterval(this.saveToLocal, 10000);
		if (this.state.isLoading) {
			let res = await this.props.getMatchTeamNums();
			if (res.cannotLoad) {
				alert('Could not load match and team numbers!');
				if (this._isMounted)
					this.setState({ cannotLoad: true });
			} else if (this.props.isScout || this.props.isAdmin) {
				//In the case of isScout, data will be assigned matchNum, teamNum, alliance
				//In the case of isAdmin, data will be assigned matchNum; teamNum and alliance are set to ''
				Object.assign(this.data, res);
				if (this._isMounted)
					this.setState({ isLoading: false });
			} else {
				alert('User role is not properly set!');
				if (this._isMounted)
					this.setState({ cannotLoad: true });
			}
		}
	}
	componentWillUnmount() {
		if (!this.state.redirect)
			this.saveToLocal();
		this._isMounted = false;
		window.removeEventListener("beforeunload", this.saveToLocal);
		window.clearInterval(this.interval);
	}

	collectCurView() {
		let ref = this.viewRefs[this.state.matchView];
		if (ref.current)
			Object.assign(this.data, ref.current.getJSON());
		else
			console.log('cannot find the view reference');
	}
	async getNextView() {
		this.collectCurView();
		if (this.state.matchView < this.viewList.length - 1)
			this.setState({ matchView: this.state.matchView + 1, onSavedView: false });
		else if (this.state.matchView === this.viewList.length - 1) {
			let res = await this.submitForm();
			if (res.status > 0)
				throw new SubmitError("Could not sumbit form. Please try again.");
		} else
			alert('Current match view not defined!');
	}
	saveToLocal() {
		this.collectCurView();
		localStorage.setItem("form", JSON.stringify(this.data));
		localStorage.setItem("lastView", this.state.matchView);
	}
	discardForm() {
		if (window.confirm('Discard the form?')) {
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
			this.setState({
				redirect: true,
				block: false
			});
			return { 'status': 0, message: 'success' };
		} catch (err) {
			console.log("could not submit form - catch block");
			console.log(err.stack);
			return { 'status': 1, 'message': 'Could not submit form. Please try again.' };
		}
	}

	render() {
		console.log("Current match view: " + this.viewList[this.state.matchView]);
		if (this.state.redirect)
			return <Redirect to="/" />;
		else if (this.state.cannotLoad)
			return <div><p>Sorry, cannot load the match form. Please try again.</p></div>;
		else if (this.state.isLoading)
			return <div><p>Loading...</p></div>;
		else {
			if (this.state.matchView >= 0 && this.state.matchView < this.viewList.length) {
				let Form = this.formList[this.viewList[this.state.matchView]];
				console.log(`showing ${this.viewList[this.state.matchView]}`);
				let ref = this.viewRefs[this.state.matchView];
				return (
					<div>
						<Header
							block={this.state.block}
							matchNum={this.data.matchNum}
							teamNum={this.data.teamNum} />
						<Form
							callNext={this.getNextView}
							loadData={this.state.onSavedView}
							data={this.data}
							isAdmin={this.props.isAdmin}
							discard={this.discardForm}
							ref={ref} />
					</div>
				);
			} else {
				return <div><p>Loading...</p></div>;
			}
		}
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
