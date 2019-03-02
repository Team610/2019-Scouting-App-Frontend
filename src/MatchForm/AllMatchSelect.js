import React, {Component} from 'react';
import AllMatchForm from './AllMatchForm';

export default class AllMatchSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			matchNum: null
		}
		this.selectMatchNum = this.selectMatchNum.bind(this);
	}
	selectMatchNum() {
		let input = document.getElementById('matchNumInput');
		this.setState({
			matchNum: input.value
		});
	}
	render() {
		if(!this.state.matchNum) {
			return (
				<div>
					<label>Match num: <input type="number" id="matchNumInput" min="1" max="80" /></label>
					<button onClick={this.selectMatchNum}>Submit</button>
				</div>
			);
		} else {
			return (
				<AllMatchForm matchNum = {this.state.matchNum} user = {this.props.user} />
			)
		}
	}
}
