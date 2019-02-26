import React, { Component } from 'react';

class CommentRadioInput extends Component {
	constructor(props) {
		super(props);
		this.value = "None selected";
		this.handleChange = this.handleChange.bind(this);
		this.getJSON = this.getJSON.bind(this);
	}
	getJSON() {
		let obj = {};
		obj[this.props.inputId] = this.value;
		return obj;
	}
	handleChange(event) {
		this.value = event.target.value;
		console.log(this.value);
	}
	render() {
		let choiceList = [];
		for (let choice of this.props.choices) {
			choiceList.push(<label key={choice.value} className="comment"><input type="radio" name={this.props.inputId} value={choice.value} onChange={this.handleChange} required />{choice.description}<br /></label>);
		}
		return (
			<React.Fragment>
				<p className="subheader">{this.props.description}</p>
				{choiceList}
			</React.Fragment>
		);
	}
}
export default CommentRadioInput;
