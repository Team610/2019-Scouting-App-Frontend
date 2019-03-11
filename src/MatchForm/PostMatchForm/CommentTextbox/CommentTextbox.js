import React, { Component } from 'react';

export default class CommentTextbox extends Component {
	constructor(props) {
		super(props);
		this.state = {value : this.props.data ? this.props.data.other_comments : "blank"};
		this.getJSON = this.getJSON.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	getJSON() {
		return { "other_comments": this.state.value };
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	render() {
		return (
			<div>
				<p className="subheader">Comment Textbox (only for the truly special!)</p>
				<textarea
					input="text"
					name="other_comments"
					rows="8"
					cols="40"
					onChange={this.handleChange}
					value={this.value !== 'blank' ? this.value : ''}
				/>
				<br />
			</div>
		);
	}
}
