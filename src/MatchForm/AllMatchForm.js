import React, {Component} from 'react';
import MatchFormHeader from './MatchFormHeader/MatchFormHeader';
import AllPreMatchForm from './PreMatchForm/AllPreMatchForm';
import InMatchForm from './InMatchForm/InMatchForm';
import PostMatchForm from './PostMatchForm/PostMatchForm';
import { Redirect } from 'react-router';
import "./style.css";
let fieldConfig = require('../config.json');

export default class AllMatchForm extends Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
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
	async submitForm() {
		console.log(JSON.stringify(this.data));
		this.data.user = this.props.user;

		// Submit the form!
		try {
			console.log("trying to submit form");
			await fetch('/api/v1/submitForm', {
				method: 'POST',
				body: JSON.stringify(this.data),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log("successfully submitted");
		} catch (err) {
			console.log("could not submit form");
			console.log(err.message);
		}
		this.setState({
			redirect: true
		});
	}
	collectData(view) {
		let ref;
		if (view === 'preMatch') { ref = this.preMatchRef; }
		else if (view === 'inMatch') { ref = this.inMatchRef; }
		else if (view === 'postMatch') { ref = this.postMatchRef; }
		let viewJSON = ref.current.getJSON();
		for (let key in viewJSON) {
			this.data[key] = viewJSON[key];
		}
		if (view === 'preMatch') {
			this.setState({ matchView: 'inMatch' });
			this.alliance = this.preMatchRef.current.getAlliance();
		} else if (view === 'inMatch') {
			this.setState({ matchView: 'postMatch' });
		} else if (view === 'postMatch') {
			this.submitForm();
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
