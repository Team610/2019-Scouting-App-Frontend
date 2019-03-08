import React, { Component } from 'react';

class PreGameSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);
	}
	//utils
	validFlt(num) {
		let a = num;
		if(Number.isNaN(num)||!num) a=0;
		return parseFloat(Math.round(a * 1000) / 1000).toFixed(3);
	}
	validInt(int) {
		let a = int;
		if(Number.isNaN(int)||!int) a=0;
		return parseInt(a);
	}

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
								{this.validInt(this.props.data.tot_ship_preload.hatch)}
							</td>
							<td className="analyticsTable">
								{this.validInt(this.props.data.tot_ship_preload.cargo)}
							</td>
						</tr>
						<tr>
							<td className="analyticsTable">
								Robot Preload
							</td>
							<td className="analyticsTable">
								{this.validInt(this.props.data.tot_robot_preload.hatch)}
							</td>
							<td className="analyticsTable">
								{this.validInt(this.props.data.tot_robot_preload.cargo)}
							</td>
						</tr>
					</tbody>
				</table>
				<br/>
				<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
				<br/>
			</div>
		);
	}
}

export default PreGameSection;
