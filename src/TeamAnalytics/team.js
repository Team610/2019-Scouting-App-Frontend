import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/TeamAnalyticsHeader';

class Team extends Component {
	render() {
		return (
			<div>
				<p>Requested team: {this.props.match.params.teamNum}</p>
				<TeamAnalyticsHeader num={this.props.match.params.teamNum} />
			</div>
		);
	}
}

export default Team;
