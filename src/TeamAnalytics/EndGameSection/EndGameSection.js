import React, { Component } from "react";

class EndGameSection extends Component {
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
		console.log("showing endgame match data");
	}
	render() {
		return (
			<div className="analytics-section">
				<h1 className="comp">Endgame</h1>
				<table className="analyticsTable">
					<thead>
						<tr>
							<th />
							<th>Number</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable">Level 3</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_num_climb_lvl[3])}</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.avg_time_climb_lv3)} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 2</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_num_climb_lvl[2])}</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.avg_time_climb_lv2)} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 1</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_num_climb_lvl[1])}</td>
							<td className="analyticsTable">{this.validFlt(this.props.data.avg_time_climb_lv1)} s</td>
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

export default EndGameSection;
