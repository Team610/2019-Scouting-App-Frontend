import React, { Component } from "react";
import Chart from '../Chart/Chart';

class EndGameSection extends Component {
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
		console.log('getting chart data');
		let teamNum = this.props.teamNum;
		fetch(`/api/v1/stats/team/${teamNum}/mbm`).then((res) => {
			res.json().then((res) => {
				res = res[teamNum]; //TODO: mbm stats are getting pulled multiple times
				let matchList = [];
				let climbLvl = [];
				for (let matchNum of Object.keys(res)) {
					matchList.push(`Match ${matchNum}`);
					climbLvl.push(res[matchNum].climb_lvl[0]);
				}
				this.data = {
					labels: matchList,
					datasets: [
						{
							label: "Climb Level",
							data: climbLvl,
							backgroundColor: '#00EE00'
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
						<h1 className="comp">Climbs</h1>
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
						<h1 className="comp">Climbs</h1>
						<Chart chartData={this.data} team={this.props.teamNum} title={`Climbs: `} />
						<br />
						<button className="matchdata" onClick={this.hideMatchData}>Hide Match Data</button>
						<br />
					</div>
				);
			}
		} else {
			return (
				<div className="analytics-section">
					<h1 className="comp">Climbs</h1>
					<table className="analyticsTable">
						<thead>
							<tr>
								<th />
								<th>Number</th>
								<th>Time</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="analyticsTable">Level 3</td>
								<td className="analyticsTable">{this.validInt(this.props.data.tot_num_climb_lvl[3])}</td>
								<td className="analyticsTable">{this.validFlt(this.props.data.avg_time_climb_lv3)} s</td>
							</tr>
							<tr>
								<td className="analyticsTable">Level 2</td>
								<td className="analyticsTable">{this.validInt(this.props.data.tot_num_climb_lvl[2])}</td>
								<td className="analyticsTable">{this.validFlt(this.props.data.avg_time_climb_lv2)} s</td>
							</tr>
							<tr>
								<td className="analyticsTable">Level 1</td>
								<td className="analyticsTable">{this.validInt(this.props.data.tot_num_climb_lvl[1])}</td>
								<td className="analyticsTable">{this.validFlt(this.props.data.avg_time_climb_lv1)} s</td>
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

export default EndGameSection;
