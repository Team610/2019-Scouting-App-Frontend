import React, { Component } from "react";

class OverallSection extends Component {
	constructor(props) {
		super(props);
		this.avg_num_hatch = Math.round((this.props.data.avg_num_ss_hatch_tot + this.props.data.avg_num_to_hatch_tot) * 1000) / 1000;
		this.avg_time_hatch = Math.round((this.props.data.avg_time_ss_hatch_tot * this.props.data.avg_num_ss_hatch_tot / this.avg_num_hatch + this.props.data.avg_time_to_hatch_tot * this.props.data.avg_num_to_hatch_tot / this.avg_num_hatch) * 1000) / 1000;
		this.avg_num_cargo = Math.round((this.props.data.avg_num_ss_cargo_tot + this.props.data.avg_num_to_cargo_tot) * 1000) / 1000;
		this.avg_time_cargo = Math.round((this.props.data.avg_time_ss_cargo_tot * this.props.data.avg_num_ss_cargo_tot / this.avg_num_cargo + this.props.data.avg_time_to_cargo_tot * this.props.data.avg_num_to_cargo_tot / this.avg_num_cargo) * 1000) / 1000;
		let lvl2_climbs = this.props.data.tot_num_climb_lvl[2]===undefined?0:parseInt(this.props.data.tot_num_climb_lvl[2]);
		let lvl3_climbs = this.props.data.tot_num_climb_lvl[3]===undefined?0:parseInt(this.props.data.tot_num_climb_lvl[3]);
		this.tot_climbs = lvl2_climbs+lvl3_climbs;
	}
	showMatchData() {
		console.log("show overall match data");
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
								{this.tot_climbs} @ {this.props.data.avg_time_climb_tot} s
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default OverallSection;
