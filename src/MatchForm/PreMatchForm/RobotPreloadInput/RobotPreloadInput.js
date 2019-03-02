import React, { Component } from 'react';

class RobotPreload extends Component {
	constructor(props) {
		super(props);
		this.state = { cargo: 1, hatch: 0 };
		this.getJSON = this.getJSON.bind(this);
		this.cargoIncrement = this.cargoIncrement.bind(this);
		this.hatchIncrement = this.hatchIncrement.bind(this);
		this.setToZero = this.setToZero.bind(this);
	}
	getJSON() {
		if(this.state.cargo!==this.state.hatch) {
			return ({
				[this.props.id]: this.state.cargo ? "cargo" : "hatch"
			});
		} else {
			return ({
				[this.props.id]: "neither"
			});
		}
	}
	cargoIncrement() {
		this.setState({
			cargo: this.state.cargo < 1 ? this.state.cargo + 1 : 1,
			hatch: this.state.hatch > 0 ? this.state.hatch - 1 : 0
		});
	}
	hatchIncrement() {
		this.setState({
			cargo: this.state.cargo > 0 ? this.state.cargo - 1 : 0,
			hatch: this.state.hatch < 1 ? this.state.hatch + 1 : 1
		});
	}
	setToZero() {
		this.setState({
			cargo: 0,
			hatch: 0
		});
	}
	render() {
		return (
			<React.Fragment>
				<p className="subheader">Robot Preloads</p>
				<label>
					<button type="button" onClick={this.cargoIncrement} className="increment-button">Cargo: {this.state.cargo}</button>
				</label><br />
				<label>
					<button type="button" onClick={this.hatchIncrement} className="increment-button">Hatch: {this.state.hatch}</button>
				</label>
				<label>
					<button type="button" onClick={this.setToZero} className="increment-button" style={{color:'#dd0000', backgroundColor:'#ff8888'}}>Reset to 0</button>
				</label>
			</React.Fragment>
		);
	}
}

export default RobotPreload;
