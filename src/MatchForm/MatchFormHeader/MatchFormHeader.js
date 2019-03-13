import React, { Component, Fragment } from 'react';

class MatchFormHeader extends Component {
	render() {
		return (
			<Fragment>
				<p className="subheader">Match {this.props.matchNum} &nbsp; &nbsp;Team {this.props.teamNum}</p>
			</Fragment>
		);
	}
}

export default MatchFormHeader;
