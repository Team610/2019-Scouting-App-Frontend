import React, { Component } from "react";
import "../style.css";

class TeamAnalyticsHeader extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		var teamNumber = this.props.num;
		return (
			<div>
				<h1 className="h">{teamNumber} Data Page</h1>
			</div>
		);
	}
}

export default TeamAnalyticsHeader;
