import React, { Component, Fragment } from 'react';

export default class MatchFormHeader extends Component {
	render() {
		return (
			<Fragment>
				<p className="subheader">Match {this.props.matchNum} &nbsp; &nbsp;Team {this.props.teamNum}</p>
			</Fragment>
		);
	}
}
