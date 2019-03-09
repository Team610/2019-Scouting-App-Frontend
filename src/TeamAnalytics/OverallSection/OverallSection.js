import React, { Component } from "react";

export default class OverallSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);

		this.avg_num_hatch = this.validFlt(this.props.data.avg_num_ss_hatch_tot + this.props.data.avg_num_to_hatch_tot);
		this.avg_time_hatch = this.validFlt(this.props.data.avg_time_ss_hatch_tot * this.props.data.avg_num_ss_hatch_tot / this.avg_num_hatch + this.props.data.avg_time_to_hatch_tot * this.props.data.avg_num_to_hatch_tot / this.avg_num_hatch);
		this.avg_num_cargo = this.validFlt(this.props.data.avg_num_ss_cargo_tot + this.props.data.avg_num_to_cargo_tot);
		this.avg_time_cargo = this.validFlt(this.props.data.avg_time_ss_cargo_tot * this.props.data.avg_num_ss_cargo_tot / this.avg_num_cargo + this.props.data.avg_time_to_cargo_tot * this.props.data.avg_num_to_cargo_tot / this.avg_num_cargo);
		let lvl2_climbs = this.validInt(this.props.data.tot_num_climb_lvl[2]);
		let lvl3_climbs = this.validInt(this.props.data.tot_num_climb_lvl[3]);
		this.tot_climbs = this.validInt(lvl2_climbs+lvl3_climbs);
		this.avg_time_climb = this.validFlt(this.props.data.avg_time_climb_lv2 * lvl2_climbs / this.tot_climbs + this.props.data.avg_time_climb_lv3 * lvl3_climbs / this.tot_climbs);
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

	render() {
		return (
			<div className="analytics-section">
				<h1 className="comp">Overall</h1>
				<table className="analyticsTable">
					<thead>
						<tr>
							<th>Hatch</th>
							<th>Cargo</th>
							<th>Climb</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable">
								{this.avg_num_hatch} @ {this.avg_time_hatch} s
							</td>
							<td className="analyticsTable">
								{this.avg_num_cargo} @ {this.avg_time_cargo} s
							</td>
							<td className="analyticsTable">
								{this.tot_climbs} @ {this.avg_time_climb} s
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
