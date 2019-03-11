import React, { Component } from "react";
import Chart from '../Chart/Chart';

class DefenseSection extends Component {
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
		console.log('getting defense chart data');
		let teamNum = this.props.teamNum;
		fetch(`/api/v1/stats/team/${teamNum}/mbm`).then((res) => {
			res.json().then((res) => {
				res = res[teamNum];
				let matchList = [];
				let chartData = [];
				let arr = [
					{
						label: 'Ship Goalkeeping',
						form_val: 'ship_goalkeep',
						backgroundColor: '#00EE00'
					},
					{
						label: 'Rocket Goalkeeping',
						form_val: 'rocket_goalkeep',
						backgroundColor: '#00BB00'
					},
					{
						label: 'Pinning',
						form_val: 'pinning',
						backgroundColor: '#009900'
					},
					{
						label: 'Driving Around',
						form_val: 'driving_around',
						backgroundColor: '#006600'
					}
				];
				for (let val of arr) {
					chartData.push({
						label: val.label,
						data: [],
						backgroundColor: val.backgroundColor
					});
				}
				for (let matchNum of Object.keys(res)) {
					matchList.push(`Match ${matchNum}`);
					for (let val of arr) {
						let sum = 0;
						for (let i of res[matchNum][`def_${val.form_val}`]) {
							sum += Number(i);
						}
						for (let i = 0; i < chartData.length; i++) {
							if (chartData[i].label === val.label) {
								chartData[i].data.push(sum);
							}
						}
					}
				}
				this.data = {
					labels: matchList,
					datasets: chartData
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
						<h1 className="comp">Defense</h1>
						<p>Chart loading...</p>
						<br />
						<button className="matchdata" onClick={this.hideMatchData}>Hide Match Data</button>
						<br />
					</div>
				);
			} else {
				console.log(`show defense chart data`);
				return (
					<div className="analytics-section">
						<h1 className="comp">Defense</h1>
						<Chart chartData={this.data} team={this.props.teamNum} title={`Defense: `} />
						<br />
						<button className="matchdata" onClick={this.hideMatchData}>Hide Match Data</button>
						<br />
					</div>
				);
			}
		} else {
			console.log(`show defense aggs`);
			let arr = [
				{
					label: "Total",
					name: ""
				},
				{
					label: "Ship Goalkeeping",
					name: "_ship_goalkeep"
				},
				{
					label: "Rocket Goalkeeping",
					name: "_rocket_goalkeep"
				},
				{
					label: "Pinning",
					name: "_pinning"
				},
				{
					label: "Driving Around",
					name: "_driving_around"
				}
			];
			let rows = [];
			for (let row of arr) {
				rows.push(
					<tr key={row.label}>
						<td className="analyticsTable">{row.label}</td>
						<td className="analyticsTable">{this.validFlt(this.props.data[`tot_time_def${row.name}`])}</td>
						<td className="analyticsTable">{this.validInt(this.props.data[`tot_matches_def${row.name}`])}</td>
					</tr>
				);
			}
			return (
				<div className="analytics-section">
					<h1 className="comp">Defense</h1>
					<table className="analyticsTable">
						<thead>
							<tr>
								<th />
								<th>Total Time</th>
								<th>Matches</th>
							</tr>
						</thead>
						<tbody>
							{rows}
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

export default DefenseSection;
