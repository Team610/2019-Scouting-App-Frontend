import React, { Component } from 'react';
import MatchForm from './MatchForm';

export default class ScoutMatchForm extends Component {
	async getMatchTeamNums() {
		try {
			let nums = await fetch('/api/v1/evetn/getNextUserMatch', {
				method: 'POST',
				body: JSON.stringify(this.props.user),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			nums = await nums.json();
			return {
				matchNum: Number(typeof nums.matchNum === 'object' ? nums.matchNum.low : nums.matchNum),
				teamNum: Number(typeof nums.teamNum === 'object' ? nums.teamNum.low : nums.teamNum),
				alliance: nums.alliance
			};
		} catch (err) {
			console.log('unable to get match num');
			console.log(err.stack);
			return { cannotLoad: true };
		}
	}
	render() {
		return (
			<MatchForm
				isScout={true}
				isAdmin={false}
				user={this.props.user}
				getMatchTeamNums={this.getMatchTeamNums} />
		);
	}
}
