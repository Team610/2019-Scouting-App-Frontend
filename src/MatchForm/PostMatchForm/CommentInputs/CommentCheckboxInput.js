import React, { Component } from 'react';

class CommentCheckboxInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.loadData ? this.props.data[this.props.inputId] : false
		}
		this.handleChange = this.handleChange.bind(this);
	}
	getJSON() {
		let obj = {};
		obj[this.props.inputId] = this.state.value;
		return obj;
	}
	handleChange() {
		this.setState({ value: !this.state.value });
	}
	render() {
		return (
			<label className="comment">
				<input type="checkbox"
					id={this.props.inputId}
					onChange={this.handleChange}
					checked={this.state.value} />
				{this.props.description}
				<br />
			</label>
		);
	}
}

export default CommentCheckboxInput;
