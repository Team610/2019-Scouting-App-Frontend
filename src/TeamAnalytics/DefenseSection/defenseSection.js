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
							<td>{this.props.data.defense.total.sum} s</td>
							<td>{this.props.data.defense.total.num_matches}</td>
						</tr>
						<tr>
							<td>Ship Goalkeeping</td>
							<td>{this.props.data.defense.ship_goalkeep.sum} s</td>
							<td>{this.props.data.defense.ship_goalkeep.num_matches}</td>
						</tr>
						<tr>
							<td>Rocket Goalkeeping</td>
							<td>{this.props.data.defense.rocket_goalkeep.sum} s</td>
							<td>{this.props.data.defense.rocket_goalkeep.num_matches}</td>
						</tr>
						<tr>
							<td>Pinning</td>
							<td>{this.props.data.defense.pinning.sum} s</td>
							<td>{this.props.data.defense.pinning.num_matches}</td>
						</tr>
						<tr>
							<td>Tough Defense</td>
							<td>{this.props.data.defense.tough_defense.sum} s</td>
							<td>{this.props.data.defense.tough_defense.num_matches}</td>
						</tr>
						<tr>
							<td>Driving Around</td>
							<td>{this.props.data.defense.driving_around.sum} s</td>
							<td>{this.props.data.defense.driving_around.num_matches}</td>
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
