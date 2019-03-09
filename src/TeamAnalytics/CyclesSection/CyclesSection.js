import React, { Component } from "react";
import Chart from '../Chart/Chart';

class CyclesSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);

		this.showMatchData = this.showMatchData.bind(this);
		this.hideMatchData = this.hideMatchData.bind(this);
		this.getChartData = this.getChartData.bind(this);
		this.teleop = this.teleop.bind(this);
		this.sandstorm = this.sandstorm.bind(this);

		this.state = { mode: "to", chartLoaded: false, chartOn: false };
		this.aggData = {
			ss: {
				hatch: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lv3),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lv2),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lv1),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lvS),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lvS)
					}
				},
				cargo: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lv3),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lv2),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lv1),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lvS),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lvS)
					}
				}
			},
			to: {
				hatch: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lv3),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lv2),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lv1),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lvS),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lvS)
					}
				},
				cargo: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lv3),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lv2),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lv1),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lvS),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lvS)
					}
				}
			}
		}
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
				res = res[teamNum];
				let matchList = [];
				let data = {
					to: {
						cargo: {
							lvS:[],
							lv1:[],
							lv2:[],
							lv3:[]
						},
						hatch: {
							lvS:[],
							lv1:[],
							lv2:[],
							lv3:[]
						}
					},
					ss: {
						cargo: {
							lvS:[],
							lv1:[],
							lv2:[],
							lv3:[]
						},
						hatch: {
							lvS:[],
							lv1:[],
							lv2:[],
							lv3:[]
						}
					}
				};
				for (let matchNum of Object.keys(res)) {
					matchList.push(`Match ${matchNum}`);
					for (let i=0; i<=3; i++) {
						let lv = i===0?'S':i;
						data.to.cargo[`lv${lv}`].push(res[matchNum][`to_cargo_lv${lv}`].length);
						data.to.hatch[`lv${lv}`].push(res[matchNum][`to_hatch_lv${lv}`].length);
						data.ss.cargo[`lv${lv}`].push(res[matchNum][`ss_cargo_lv${lv}`].length);
						data.ss.hatch[`lv${lv}`].push(res[matchNum][`ss_hatch_lv${lv}`].length);
					}
				}
				this.toChartData = {
					labels: matchList,
					datasets: [
						{
							label: "Cargo Lv S",
							data: data.to.cargo.lvS,
							backgroundColor: '#EE0000'
						},
						{
							label: "Cargo Lv 1",
							data: data.to.cargo.lv1,
							backgroundColor: '#BB0000'
						},
						{
							label: "Cargo Lv 2",
							data: data.to.cargo.lv2,
							backgroundColor: '#990000'
						},
						{
							label: "Cargo Lv 3",
							data: data.to.cargo.lv3,
							backgroundColor: '#660000'
						},
						{
							label: "Hatch Lv S",
							data: data.to.hatch.lvS,
							backgroundColor: '#00EE00'
						},
						{
							label: "Hatch Lv 1",
							data: data.to.hatch.lv1,
							backgroundColor: '#00BB00'
						},
						{
							label: "Hatch Lv 2",
							data: data.to.hatch.lv2,
							backgroundColor: '#009900'
						},
						{
							label: "Hatch Lv 3",
							data: data.to.hatch.lv3,
							backgroundColor: '#006600'
						}
					]
				};
				this.ssChartData = {
					labels: matchList,
					datasets: [
						{
							label: "Cargo Lv S",
							data: data.ss.cargo.lvS,
							backgroundColor: '#EE0000'
						},
						{
							label: "Cargo Lv 1",
							data: data.ss.cargo.lv1,
							backgroundColor: '#BB0000'
						},
						{
							label: "Cargo Lv 2",
							data: data.ss.cargo.lv2,
							backgroundColor: '#990000'
						},
						{
							label: "Cargo Lv 3",
							data: data.ss.cargo.lv3,
							backgroundColor: '#660000'
						},
						{
							label: "Hatch Lv S",
							data: data.ss.hatch.lvS,
							backgroundColor: '#00EE00'
						},
						{
							label: "Hatch Lv 1",
							data: data.ss.hatch.lv1,
							backgroundColor: '#00BB00'
						},
						{
							label: "Hatch Lv 2",
							data: data.ss.hatch.lv2,
							backgroundColor: '#009900'
						},
						{
							label: "Hatch Lv 3",
							data: data.ss.hatch.lv3,
							backgroundColor: '#006600'
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
						<CyclesHeader teleop={this.teleop} sandstorm={this.sandstorm} />
						<p>Chart loading...</p>
						<br/>
						<button className="matchdata" onClick={this.hideMatchData}>Hide Match Data</button>
						<br/>
					</div>
				);
			} else {
				console.log(`show ${this.state.mode} cycle graphs`);
				return (
					<div className="analytics-section">
						<CyclesHeader teleop={this.teleop} sandstorm={this.sandstorm} />
						<Chart chartData={this[`${this.state.mode}ChartData`]} team={this.props.teamNum} title={`${this.state.mode.toUpperCase()} Cycles: `} />
						<br/>
						<button className="matchdata" onClick={this.hideMatchData}>Hide Match Data</button>
						<br/>
					</div>
				);
			}
		} else {
			let rows = [];
			for (let i = 3; i >= 0; i--) {
				let lvl = i !== 0 ? i : 'S';
				rows.push(
					<tr key={lvl}>
						<td className="analyticsTable">{lvl}</td>
						<td className="analyticsTable">{this.aggData[this.state.mode].hatch[`lv${lvl}`].num} @ {this.aggData[this.state.mode].hatch[`lv${lvl}`].time} s</td>
						<td className="analyticsTable">{this.aggData[this.state.mode].cargo[`lv${lvl}`].num} @ {this.aggData[this.state.mode].cargo[`lv${lvl}`].time} s</td>
					</tr>
				);
			}
			console.log(`show ${this.state.mode} cycle aggs`);
			return (
				<div className="analytics-section">
					<CyclesHeader teleop={this.teleop} sandstorm={this.sandstorm} />
					<table className="analyticsTable">
						<thead>
							<tr>
								<th>Level</th>
								<th>Hatch</th>
								<th>Cargo</th>
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
	teleop() {
		if (this.state.mode !== "to") {
			this.setState({ mode: "to" });
		}
	};
	sandstorm() {
		if (this.state.mode !== "ss") {
			this.setState({ mode: "ss" });
		}
	};
}

class CyclesHeader extends Component {
	render() {
		return (
			<h1 className="comp">
				Cycles
				<button className="tab-btns" style={{ marginLeft: "20px" }} onClick={this.props.teleop}>TO</button>
				<button className="tab-btns" style={{ margin: "5px" }} onClick={this.props.sandstorm}>SS</button>
			</h1>
		)
	}
}

export default CyclesSection;
