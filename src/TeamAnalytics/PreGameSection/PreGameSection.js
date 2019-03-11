import React, { Component } from 'react';
import Chart from '../Chart/Chart';

class PreGameSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);

		this.showMatchData = this.showMatchData.bind(this);
		this.hideMatchData = this.hideMatchData.bind(this);
		this.getChartData = this.getChartData.bind(this);

		this.state = { chartLoaded: false, chartOn: false };
	}
	//utils
	validFlt(num) {
		let a = num;
		if (Number.isNaN(num) || !num) a = 0;
		return parseFloat(Math.round(a * 1000) / 1000).toFixed(3);
	}
	validInt(int) {
		let a = int;
		if (Number.isNaN(int) || !int) a = 0;
		return parseInt(a);
	}

	async showMatchData() {
		this.setState({
			chartOn: true
		});
		if (!this.state.chartLoaded) {
			await this.getChartData();
		}
	}
	hideMatchData() {
		this.setState({
			chartOn: false
		});
	}
	getChartData() {
		console.log('getting preload chart data');
		let teamNum = this.props.teamNum;
		fetch(`/api/v1/stats/team/${teamNum}/mbm`).then((res) => {
			res.json().then((res) => {
				res = res[teamNum]; //TODO: mbm stats are getting pulled multiple times
				let matchList = [];
				let shpHData = [];
				let shpCData = [];
				let robHData = [];
				let robCData = [];
				for (let matchNum of Object.keys(res)) {
					matchList.push(`Match ${matchNum}`);
					res[matchNum].ship_preloads[0] === 'hatch' && res[matchNum].ship_preloads[1] === 'hatch' ? shpHData.push(2) : shpCData.push(0);
					res[matchNum].ship_preloads[0] === 'hatch' && res[matchNum].ship_preloads[1] === 'cargo' ? shpHData.push(1) : shpCData.push(1);
					res[matchNum].ship_preloads[0] === 'cargo' && res[matchNum].ship_preloads[1] === 'hatch' ? shpHData.push(1) : shpCData.push(1);
					res[matchNum].ship_preloads[0] === 'cargo' && res[matchNum].ship_preloads[1] === 'cargo' ? shpHData.push(0) : shpCData.push(2);
					robHData.push(res[matchNum].robot_preload[0] === 'hatch' ? 1 : 0);
					robCData.push(res[matchNum].robot_preload[0] === 'cargo' ? 1 : 0);
				}
				this.data = {
					labels: matchList,
					datasets: [
						{
							label: "Robot Hatch",
							data: robHData,
							backgroundColor: '#EE0000'
						},
						{
							label: "Robot Cargo",
							data: robCData,
							backgroundColor: '#00EE00'
						},
						{
							label: "Ship Hatch",
							data: shpHData,
							backgroundColor: '#990000'
						},
						{
							label: "Ship Cargo",
							data: shpCData,
							backgroundColor: '#009900'
						}
					]
				};
				this.setState({
					chartLoaded: true
				});
			});
		});
	}

	render() {
		if (this.state.chartOn) {
			if (!this.state.chartLoaded) {
				return (
					<div className="analytics-section">
						<h1 className="comp">Preloads</h1>
						<p>Chart loading...</p>
						<br />
						<button className="matchdata" onClick={this.hideMatchData}>Hide Match Data</button>
						<br />
					</div>
				);
			} else {
				console.log(`show preload graphs`);
				return (
					<div className="analytics-section">
						<h1 className="comp">Preloads</h1>
						<Chart chartData={this.data} team={this.props.teamNum} title={`Preloads: `} />
						<br />
						<button className="matchdata" onClick={this.hideMatchData}>Hide Match Data</button>
						<br />
					</div>
				);
			}
		} else {
			console.log(`show preload aggs`);
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
					<br />
					<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
					<br />
				</div>
			);
		}
	}
}

export default PreGameSection;
