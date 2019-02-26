import React, { Component } from "react";

class Endgame extends Component {
	showMatchData() {
		console.log("showing endgame match data");
	}
	render() {
		return (
			<div>
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
							<td className="analyticsTable">{this.props.data.tot_num_climb_lvl[3]?this.props.data.tot_num_climb_lvl[3]:0}</td>
							<td className="analyticsTable">{this.props.data.avg_time_climb_lv3?this.props.data.avg_time_climb_lv3:0}s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 2</td>
							<td className="analyticsTable">{this.props.data.tot_num_climb_lvl[2]?this.props.data.tot_num_climb_lvl[2]:0}</td>
							<td className="analyticsTable">{this.props.data.avg_time_climb_lv2?this.props.data.avg_time_climb_lv2:0}s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 1</td>
							<td className="analyticsTable">{this.props.data.tot_num_climb_lvl[1]?this.props.data.tot_num_climb_lvl[1]:0}</td>
							<td className="analyticsTable">{this.props.data.avg_time_climb_lv1?this.props.data.avg_time_climb_lv1:0}s</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable"/>
							<td className="analyticsTable">
								<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Endgame;
