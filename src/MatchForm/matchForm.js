import React, { Component } from 'react';
import MatchFormHeader from './MatchFormHeader/MatchFormHeader';
import PreMatchForm from './PreMatchForm/PreMatchForm';
import InMatchForm from './InMatchForm/InMatchForm';
import PostMatchForm from './PostMatchForm/PostMatchForm';
import { Redirect } from 'react-router';
import "./style.css";
let fieldConfig = require('../config.json');

class MatchForm extends Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.getMatchNum = this.getMatchNum.bind(this);
		this.state = {
			matchView: 'preMatch',
			loading: true
		}

		this.data = { matchNum: this.matchNum };
		this.preMatchRef = React.createRef();
		this.inMatchRef = React.createRef();
		this.postMatchRef = React.createRef();
		this.viewRefs = [this.preMatchRef, this.inMatchRef, this.postMatchRef];
		this.alliance = 'red';
	}
	componentDidMount() {
		this.getMatchNum().then(res => {
			this.matchNum = res;
			this.getTeam().then(res => {
				this.teamNum = res;
				this.setState({
					loading: false
				});
			});
		});
	}
	async getMatchNum() {
		try {
			console.log('getting match num');
			let num = await fetch('/api/v1/curMatch', {
				method: 'GET'
			});
			num = await num.json();
			console.log(`got match num: ${JSON.stringify(num)}`);
			return typeof num['num'] === 'object' ? num['num']['low'] : num['num'];
		} catch (err) {
			console.log("unable to get match num");
			console.log(err.message);
			this.setState({
				cannotLoad: true
			})
		}
	}
	async getTeam() {
		try {
			
		} catch (err) {
			console.log('unable to get team num');
			console.log(err.message);
		}
	}
	async submitForm() {
		console.log(JSON.stringify(this.data));

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
		if (this.state.cannotLoad) {
			return (
				<div>
					<p>Could not load form. Please try again.</p>
				</div>
			);
		}
		if (this.state.loading) {
			return (
				<div><p>Loading...</p></div>
			)
		}
		if (this.state.matchView === 'preMatch') {
			return (
				<div>
					<MatchFormHeader matchNum={this.matchNum} /><hr />
					<PreMatchForm callNext={() => this.collectData('preMatch')} matchNum={this.matchNum} ref={this.preMatchRef} />
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

export default MatchForm;
