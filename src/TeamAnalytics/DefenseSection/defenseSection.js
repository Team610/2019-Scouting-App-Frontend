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
							<td className="analyticsTable">{this.props.data.tot_time_def}</td>
							<td className="analyticsTable" />
						</tr>
						<tr>
							<td className="analyticsTable">Ship Goalkeeping</td>
							<td className="analyticsTable">{this.props.data.tot_time_def_ship_goalkeep}</td>
							<td className="analyticsTable" />
						</tr>
						<tr>
							<td className="analyticsTable">Rocket Goalkeeping</td>
							<td className="analyticsTable">{this.props.data.tot_time_def_rocket_goalkeep}</td>
							<td className="analyticsTable" />
						</tr>
						<tr>
							<td className="analyticsTable">Pinning</td>
							<td className="analyticsTable">{this.props.data.tot_time_def_pinning}</td>
							<td className="analyticsTable" />
						</tr>
						<tr>
							<td className="analyticsTable">Tough Defense</td>
							<td className="analyticsTable">{this.props.data.tot_time_def_tough_defense}</td>
							<td className="analyticsTable" />
						</tr>
						<tr>
							<td className="analyticsTable">Driving Around</td>
							<td className="analyticsTable">{this.props.data.tot_time_def_driving_around}</td>
							<td className="analyticsTable" />
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable" />
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

export default DefenseSection;
