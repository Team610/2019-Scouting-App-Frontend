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
							<td>{this.props.data.climb_self.lvl_3_num.avg}</td>
							<td>{this.props.data.climb_self.lvl_3_time.avg}s</td>
						</tr>
						<tr>
							<td>Level 2</td>
							<td>{this.props.data.climb_self.lvl_2_num.avg}</td>
							<td>{this.props.data.climb_self.lvl_2_time.avg}s</td>
						</tr>
						<tr>
							<td>Level 1</td>
							<td>{this.props.data.climb_self.lvl_1_num.avg}</td>
							<td>{this.props.data.climb_self.lvl_1_time.avg}s</td>
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
