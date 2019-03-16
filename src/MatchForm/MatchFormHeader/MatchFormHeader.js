import React, { Component, Fragment } from 'react';
import { Prompt } from 'react-router';

export default class MatchFormHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamNum: this.props.teamNum,
			matchNum: this.props.matchNum
		}
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	componentDidUpdate(prevProps) {
		let obj = {};
		if (this.props.teamNum !== prevProps.teamNum)
			obj.teamNum = this.props.teamNum;
		if (this.props.matchNum !== prevProps.matchNum)
			obj.matchNum = this.props.matchNum;
		if (Object.keys(obj).length > 0 && this._isMounted)
			this.setState(obj);
	}
	render() {
		return (
			<Fragment>
				<Prompt
					when={this.props.block}
					message={location =>
						`Are you sure you want to go to ${location.pathname} ?`
					}
				/>
				<p className="subheader">Match {this.props.matchNum} &nbsp; &nbsp;Team {this.props.teamNum}</p>
				<hr />
			</Fragment>
		);
	}
}
