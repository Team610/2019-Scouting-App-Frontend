import React, { Component } from 'react';

class ShipPreload extends Component {
	constructor(props) {
		super(props);
		let cargoCount, hatchCount;
		if (this.props.loadData) {
			cargoCount = 0;
			hatchCount = 0;
			for (let preload of this.props.data.ship_preloads) {
				preload === 'cargo' ? cargoCount++ : hatchCount++;
			}
		} else {
			cargoCount = 1;
			hatchCount = 1;
		}
		this.state = {
			cargo: cargoCount,
			hatch: hatchCount
		};
		this.getJSON = this.getJSON.bind(this);
		this.cargoIncrement = this.cargoIncrement.bind(this);
		this.hatchIncrement = this.hatchIncrement.bind(this);
	}
	getJSON() {
		let arr = [];
		for (let i = 0; i < this.state.cargo; i++) {
			arr.push("cargo");
		}
		for (let i = 0; i < this.state.hatch; i++) {
			arr.push("hatch");
		}
		return ({
			[this.props.id]: arr
		});
	}
	cargoIncrement() {
		this.setState({
			cargo: this.state.cargo < 2 ? this.state.cargo + 1 : 2,
			hatch: this.state.hatch > 0 ? this.state.hatch - 1 : 0
		});
	}
	hatchIncrement() {
		this.setState({
			cargo: this.state.cargo > 0 ? this.state.cargo - 1 : 0,
			hatch: this.state.hatch < 2 ? this.state.hatch + 1 : 2
		});
	}
	render() {
		return (
			<React.Fragment>
				<p className="subheader">Ship Preloads</p>
				<label>
					<button type="button" onClick={this.cargoIncrement} className="increment-button">Cargo: {this.state.cargo}</button>
				</label><br />
				<label>
					<button type="button" onClick={this.hatchIncrement} className="increment-button">Hatch: {this.state.hatch}</button>
				</label>
				<label>
					<button type="button" onClick={this.hatchIncrement} className="increment-button" style={{visibility:'hidden'}}>Hatch: {this.state.hatch}</button>
				</label>
			</React.Fragment>
		);
	}
}

export default ShipPreload;
