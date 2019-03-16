import React, { Component, Fragment } from 'react';

export default class CommentRadioInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.loadData ? this.props.data[this.props.inputId] : this.props.choices[0].value
		}
		this.handleChange = this.handleChange.bind(this);
		this.getJSON = this.getJSON.bind(this);
	}
	getJSON() {
		let obj = {};
		obj[this.props.inputId] = this.state.value;
		return obj;
	}
	handleChange(event) {
		this.setState({	value: event.target.value });
	}
	render() {
		let choiceList = [];
		for (let choice of this.props.choices) {
			choiceList.push(
				<label key={choice.value} className="comment">
					<input type="radio"
						name={this.props.inputId}
						value={choice.value}
						onChange={this.handleChange}
						checked = {this.state.value === choice.value ? true : false}
					/>
					{choice.description}
					<br />
				</label>
			);
		}
		return (
			<Fragment>
				<p className="subheader">{this.props.description}</p>
				{choiceList}
			</Fragment>
		);
	}
}
