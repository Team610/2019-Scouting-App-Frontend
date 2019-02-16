import React, { Component } from 'react';

class PreGameSection extends Component {
	showMatchData() {
		console.log("show pregame match data");
	}
	render() {
		return (
			<div>
				<h1 className="comp">Preloads</h1>
				<table>
					<thead>
						<tr>
							<th />
							<th>Hatches</th>
							<th>Cargo</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Ship Preload
							</td>
							<td>
								{this.props.data.ship_preload.hatch.avg}
							</td>
							<td>
								{this.props.data.ship_preload.cargo.avg}
							</td>
						</tr>
						<tr>
							<td>
								Robot Preload
							</td>
							<td>
								{this.props.data.robot_preload.hatch.avg}
							</td>
							<td>
								{this.props.data.robot_preload.cargo.avg}
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

export default PreGameSection;
