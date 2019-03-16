import React, { Component, Fragment } from "react";

export default class MatchDataButton extends Component {
	constructor(props) {
		super(props);
		this.state = { value: !!this.props.show };
		this.flipState = this.flipState.bind(this);
	}
	async flipState() {
		await this.props.flipState();
	}
	componentDidUpdate(prevProps) {
		if (this.props.show !== prevProps.show)
			this.setState({ value: this.props.show });
	}
	render() {
		return (
			<Fragment>
				<button
					className="matchdata"
					onClick={this.flipState}
				>
					{this.state.value ? 'Hide' : 'View'} Match Data
				</button>
				<br />
				<br />
			</Fragment>
		);
	}
}
