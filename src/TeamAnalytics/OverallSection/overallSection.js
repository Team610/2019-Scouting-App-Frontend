import React, { Component } from "react";
import "../style.css";

class OverallSection extends Component {
	showMatchData() {
		console.log("show overall match data");
	}
	render() {
		return (
			<div>
				<h1 className="comp">Overall</h1>
				<table>
					<thead>
						<tr>
							<th>Hatch</th>
							<th>Cargo</th>
							<th>Climb</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{this.props.data.avg_num_hatch_tot} @ {this.props.data.avg_time_hatch_tot} s
							</td>
							<td>
								{this.props.data.avg_time_cargo_tot} @ {this.props.data.avg_time_cargo_tot} s
							</td>
							<td>
								{this.props.data.climb_self.lvl.avg} @ {this.props.data.climb_self.time.avg} s
							</td>
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

export default OverallSection;
