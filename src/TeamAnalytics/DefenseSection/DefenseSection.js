import React, { Component } from "react";

class DefenseSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);
	}
	//utils
	validFlt(num) {
		let a = num;
		if(Number.isNaN(num)||!num) a=0;
		return parseFloat(Math.round(a * 1000) / 1000).toFixed(3);
	}
	validInt(int) {
		let a = int;
		if(Number.isNaN(int)||!int) a=0;
		return parseInt(a);
	}

	showMatchData() {
		console.log("showing defense match data");
	}
	render() {
		return (
			<div className="analytics-section">
				<h1 className="comp">
					<table className="header">
						<thead>
							<tr>
								<th className="name">Defense</th>
							</tr>
						</thead>
					</table>
				</h1>
				<table className="analyticsTable">
					<thead>
						<tr>
							<th />
							<th>Total Time</th>
							<th>Matches</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable">Total</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.tot_time_def)} s</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_matches_def)}</td>
						</tr>
						<tr>
							<td className="analyticsTable">Ship Goalkeeping</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.tot_time_def_ship_goalkeep)} s</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_matches_def_ship_goalkeep)}</td>
						</tr>
						<tr>
							<td className="analyticsTable">Rocket Goalkeeping</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.tot_time_def_rocket_goalkeep)} s</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_matches_def_rocket_goalkeep)}</td>
						</tr>
						<tr>
							<td className="analyticsTable">Pinning</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.tot_time_def_pinning)} s</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_matches_def_pinning)}</td>
						</tr>
						<tr>
							<td className="analyticsTable">Tough Defense</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.tot_time_def_tough_defense)} s</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_matches_def_tough_defense)}</td>
						</tr>
						<tr>
							<td className="analyticsTable">Driving Around</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.tot_time_def_driving_around)} s</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_matches_def_driving_around)}</td>
						</tr>
					</tbody>
				</table>
				<br/>
				<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
				<br/>
			</div>
		);
	}
}

export default DefenseSection;
