import React, { Component } from "react";

class Endgame extends Component {
	showMatchData() {
		console.log("showing endgame match data");
	}
	render() {
		return (
			<div>
				<h1 className="comp">Endgame</h1>
				<table>
					<thead>
						<tr>
							<th />
							<th>Rate</th>
							<th>Time</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Level 3</td>
							<td>{this.props.data.tot_num_climb_lvl[3]}</td>
							<td>{this.props.data.avg_time_climb_lv3}s</td>
						</tr>
						<tr>
							<td>Level 2</td>
							<td>{this.props.data.tot_num_climb_lvl[2]}</td>
							<td>{this.props.data.avg_time_climb_lv2}s</td>
						</tr>
						<tr>
							<td>Level 1</td>
							<td>{this.props.data.tot_num_climb_lvl[1]}</td>
							<td>{this.props.data.avg_time_climb_lv1}s</td>
						</tr>
						<tr>
							<td />
							<td />
							<td>
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
