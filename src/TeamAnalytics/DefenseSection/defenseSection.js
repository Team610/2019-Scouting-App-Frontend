import React, { Component } from "react";

class DefenseSection extends Component {
	showMatchData() {
		console.log("showing defense match data");
	}
	render() {
		return (
			<div>
				<h1 className="comp">
					<table className="header">
						<thead>
							<tr>
								<th className="name">Defense</th>
							</tr>
						</thead>
					</table>
				</h1>
				<table>
					<thead>
						<tr>
							<th />
							<th>Time</th>
							<th>Matches</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Total</td>
							<td>{this.props.data.tot_time_def}</td>
							<td/>
						</tr>
						<tr>
							<td>Ship Goalkeeping</td>
							<td>{this.props.data.tot_time_def_ship_goalkeep}</td>
							<td/>
						</tr>
						<tr>
							<td>Rocket Goalkeeping</td>
							<td>{this.props.data.tot_time_def_rocket_goalkeep}</td>
							<td/>
						</tr>
						<tr>
							<td>Pinning</td>
							<td>{this.props.data.tot_time_def_pinning}</td>
							<td/>
						</tr>
						<tr>
							<td>Tough Defense</td>
							<td>{this.props.data.tot_time_def_tough_defense}</td>
							<td/>
						</tr>
						<tr>
							<td>Driving Around</td>
							<td>{this.props.data.tot_time_def_driving_around}</td>
							<td/>
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

export default DefenseSection;
