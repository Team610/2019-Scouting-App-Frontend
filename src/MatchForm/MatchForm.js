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
			this.matchNum = res.matchNum;
			this.teamNum = res.teamNum;
			this.alliance = res.alliance;
			this.data = { matchNum: this.matchNum };
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
			console.log('successfully submitted');
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
					<PreMatchForm callNext={() => this.collectData('preMatch')} teamNum={this.teamNum} matchNum={this.matchNum} ref={this.preMatchRef} />
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
