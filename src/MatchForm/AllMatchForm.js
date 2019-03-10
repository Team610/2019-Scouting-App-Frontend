import React, { Component } from 'react';
import MatchFormHeader from './MatchFormHeader/MatchFormHeader';
import AllPreMatchForm from './PreMatchForm/AllPreMatchForm';
import InMatchForm from './InMatchForm/InMatchForm';
import PostMatchForm from './PostMatchForm/PostMatchForm';
import { Redirect } from 'react-router';
import SubmitError from './SubmitError';
import "./style.css";
let fieldConfig = require('../config.json');

export default class AllMatchForm extends Component { //TODO: figure out how to avoid duplicate code between MatchForm.js and AllMatchForm.js
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.saveToLocal = this.saveToLocal.bind(this);
		this.state = {
			matchView: 'preMatch'
		}

		this.matchNum = this.props.matchNum;
		this.data = { matchNum: this.matchNum };

		this.preMatchRef = React.createRef();
		this.inMatchRef = React.createRef();
		this.postMatchRef = React.createRef();
		this.viewRefs = [this.preMatchRef, this.inMatchRef, this.postMatchRef];
		this.alliance = 'red';
	}
	componentDidMount() {
		window.addEventListener(
			"beforeunload",
			this.saveToLocal
		);
	}
	componentWillUnmount() {
		this.saveToLocal();
		window.removeEventListener(
			"beforeunload",
			this.saveToLocal
		);
	}
	saveToLocal() { //TODO: un-duplicate the code below
		let ref;
		if (this.state.matchView === 'preMatch') { ref = this.preMatchRef; }
		else if (this.state.matchView === 'inMatch') { ref = this.inMatchRef; }
		else if (this.state.matchView === 'postMatch') { ref = this.postMatchRef; }
		let viewJSON = ref.current.getJSON();
		for (let key in viewJSON) {
			this.data[key] = viewJSON[key];
		}

		localStorage.setItem("form", JSON.stringify(this.data));
	}
	async submitForm() {
		console.log(JSON.stringify(this.data));
		this.data.user = this.props.user;

		// Submit the form!
		try {
			console.log("trying to submit form");
			let res = await fetch('/api/v1/submitForm', {
				method: 'POST',
				body: JSON.stringify(this.data),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if(!res.ok) {
				console.log("could not submit form - !res.ok block");
				throw new SubmitError("Could not sumbit form. Please try again.");
			}
			console.log("successfully submitted");
		} catch (err) {
			console.log("could not submit form - catch block");
			console.log(err.stack);
			return {'status':1,'message':'Could not submit form. Please try again.'};
		}
		this.setState({
			redirect: true
		});
		return {'status':0, message: 'success'};
	}
	async collectData(view) {
		//Data collection
		let ref;
		if (view === 'preMatch') { ref = this.preMatchRef; }
		else if (view === 'inMatch') { ref = this.inMatchRef; }
		else if (view === 'postMatch') { ref = this.postMatchRef; }
		let viewJSON = ref.current.getJSON();
		for (let key in viewJSON) {
			this.data[key] = viewJSON[key];
		}

		//Render next view or submit as appropriate
		if (view === 'preMatch') {
			this.setState({ matchView: 'inMatch' });
			this.alliance = this.preMatchRef.current.getAlliance();
		} else if (view === 'inMatch') {
			this.setState({ matchView: 'postMatch' });
		} else if (view === 'postMatch') {
			let res = await this.submitForm();
			if(res.status>0) {
				throw new SubmitError("Could not sumbit form. Please try again.");
			}
		}
	}
	render() {
		if (this.state.redirect) {
			return (
				<Redirect to="/" />
			);
		}
		if (this.state.matchView === 'preMatch') {
			return (
				<div>
					<MatchFormHeader matchNum={this.matchNum} /><hr />
					<AllPreMatchForm callNext={() => this.collectData('preMatch')} matchNum={this.matchNum} ref={this.preMatchRef} />
				</div>
			);
		} else if (this.state.matchView === 'inMatch') {
			return (
				<div>
					<MatchFormHeader matchNum={this.matchNum} /><hr />
					<InMatchForm callNext={() => this.collectData('inMatch')} alliance={this.alliance} blueSide={fieldConfig.blueSide} robotPreload={this.data.robot_preload} ref={this.inMatchRef} />
				</div>
			);
		} else if (this.state.matchView === 'postMatch') {
			return (
				<div>
					<MatchFormHeader matchNum={this.matchNum} /><hr />
					<PostMatchForm callNext={() => this.collectData('postMatch')} ref={this.postMatchRef} />
				</div>
			);
		}
		return (
			<div>
				<MatchFormHeader matchNum={this.matchNum} /><hr />
				Loading...
			</div>
		);
	}
}
