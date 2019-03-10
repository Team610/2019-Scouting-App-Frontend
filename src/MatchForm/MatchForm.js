import React, { Component } from 'react';
import MatchFormHeader from './MatchFormHeader/MatchFormHeader';
import PreMatchForm from './PreMatchForm/PreMatchForm';
import InMatchForm from './InMatchForm/InMatchForm';
import PostMatchForm from './PostMatchForm/PostMatchForm';
import { Redirect } from 'react-router';
import SubmitError from './SubmitError';
import "./style.css";
let fieldConfig = require('../config.json');

class MatchForm extends Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.getMatchTeamNums = this.getMatchTeamNums.bind(this);
		this.state = {
			matchView: 'preMatch'
		}

		this.preMatchRef = React.createRef();
		this.inMatchRef = React.createRef();
		this.postMatchRef = React.createRef();
		this.viewRefs = [this.preMatchRef, this.inMatchRef, this.postMatchRef];
	}
	componentDidMount() {
		this.getMatchTeamNums().then(res => {
			this.data = { matchNum: res.matchNum, teamNum: res.teamNum, alliance: res.alliance };
			this.setState({
				loading: false
			});
		});
	}
	async getMatchTeamNums() {
		try {
			console.log('getting match, team nums');
			let nums = await fetch('/api/v1/event/getNextUserMatch', {
				method: 'POST',
				body: JSON.stringify(this.props.user),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			nums = await nums.json();
			console.log(`got nums: ${JSON.stringify(nums)}`);
			let obj = {};
			obj.matchNum = typeof nums.matchNum === 'object' ? nums.matchNum.low : nums.matchNum;
			obj.teamNum = typeof nums.teamNum === 'object' ? nums.teamNum.low : nums.teamNum;
			obj.alliance = nums.alliance;
			return obj;
		} catch (err) {
			console.log("unable to get match num");
			console.log(err.message);
			this.setState({
				cannotLoad: true
			});
		}
	}
	async submitForm() {
		console.log(JSON.stringify(this.data));
		this.data.user = this.props.user;
		let alliance = this.data.alliance;
		delete this.data.alliance;
		//Strip the alliance from the form

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
				this.data.alliance = alliance;
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
					<MatchFormHeader matchNum={this.data.matchNum} teamNum={this.data.teamNum} /><hr />
					<PreMatchForm
						callNext={() => this.collectData('preMatch')}
						teamNum={this.data.teamNum}
						matchNum={this.data.matchNum}
						alliance={this.data.alliance}
						ref={this.preMatchRef} />
				</div>
			);
		} else if (this.state.matchView === 'inMatch') {
			return (
				<div>
					<MatchFormHeader matchNum={this.data.matchNum} teamNum={this.data.teamNum} /><hr />
					<InMatchForm
						callNext={() => this.collectData('inMatch')}
						alliance={this.data.alliance}
						blueSide={fieldConfig.blueSide}
						robotPreload={this.data.robot_preload}
						ref={this.inMatchRef} />
				</div>
			);
		} else if (this.state.matchView === 'postMatch') {
			return (
				<div>
					<MatchFormHeader matchNum={this.data.matchNum} teamNum={this.data.teamNum} /><hr />
					<PostMatchForm
						callNext={() => this.collectData('postMatch')}
						ref={this.postMatchRef} />
				</div>
			);
		}
		return (
			<div>
				<MatchFormHeader matchNum={this.data.matchNum} teamNum={this.data.teamNum} /><hr />
				Loading...
			</div>
		);
	}
}

export default MatchForm;
