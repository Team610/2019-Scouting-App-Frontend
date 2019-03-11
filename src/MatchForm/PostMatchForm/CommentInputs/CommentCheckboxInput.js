import React, { Component } from 'react';

class CommentCheckboxInput extends Component {
	constructor(props) {
		super(props);
		this.value = this.props.data ? this.props.data[this.props.inputId] : false;
		this.handleChange = this.handleChange.bind(this);
	}
	getJSON() {
		let obj = {};
		obj[this.props.inputId] = this.value;
		return obj;
	}
	handleChange() {
		this.value = !this.value;
	}
	render() {
		return (
			<label className="comment">
				<input type="checkbox"
					id={this.props.inputId}
					onChange={this.handleChange}
					checked={this.value} />
				{this.props.description}
				<br />
			</label>
		);
	}
}

export default CommentCheckboxInput;
