import React, { Component } from 'react';

class PreGameSection extends Component {
	showMatchData() {
		console.log("show pregame match data");
	}
	render() {
		return (
			<div className="analytics-section">
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
								{this.props.data.tot_ship_preload.hatch?this.props.data.tot_ship_preload.hatch:0}
							</td>
							<td className="analyticsTable">
								{this.props.data.tot_ship_preload.cargo?this.props.data.tot_ship_preload.cargo:0}
							</td>
						</tr>
						<tr>
							<td className="analyticsTable">
								Robot Preload
							</td>
							<td className="analyticsTable">
								{this.props.data.tot_robot_preload.hatch?this.props.data.tot_robot_preload.hatch:0}
							</td>
							<td className="analyticsTable">
								{this.props.data.tot_robot_preload.cargo?this.props.data.tot_robot_preload.cargo:0}
							</td>
						</tr>
					</tbody>
				</table>
				<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
			</div>
		);
	}
}

export default PreGameSection;
