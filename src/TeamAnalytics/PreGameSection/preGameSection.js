import React, { Component } from 'react';

class PreGameSection extends Component {
	showMatchData() {
		console.log("show pregame match data");
	}
	render() {
		return (
			<div>
				<h1 className="comp">Preloads</h1>
				<table className="analyticsTable">
					<thead>
						<tr>
							<th />
							<th>Hatches</th>
							<th>Cargo</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable">
								Ship Preload
							</td>
							<td className="analyticsTable">
								{this.props.data.tot_ship_preload.hatch}
							</td>
							<td className="analyticsTable">
								{this.props.data.tot_ship_preload.cargo}
							</td>
						</tr>
						<tr>
							<td className="analyticsTable">
								Robot Preload
							</td>
							<td className="analyticsTable">
								{this.props.data.tot_robot_preload.hatch}
							</td>
							<td className="analyticsTable">
								{this.props.data.tot_robot_preload.cargo}
							</td>
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

export default PreGameSection;
