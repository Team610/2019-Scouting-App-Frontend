import React, { Component, Fragment } from "react";
import Chart from '../Components/Chart';
import { validFlt } from '../Components/Util';
import MDButton from '../Components/MatchDataButton';
import ATable from '../Components/AnalyticsTable';

export default class CyclesSection extends Component {
	constructor(props) {
		super(props);
		this.getChartData = this.getChartData.bind(this);
		this.flipState = this.flipState.bind(this);
		this.teleop = this.teleop.bind(this);
		this.sandstorm = this.sandstorm.bind(this);
		this.populateHeaders = this.populateHeaders.bind(this);
		this.populateRows = this.populateRows.bind(this);

		this.state = { gamePeriod: "to", chartLoaded: false, chartOn: false, headers: this.populateHeaders(), rows: this.populateRows() };
	}

	populateHeaders() {
		return ["Level", "Hatch", "Cargo"];
	}
	populateRows() {
		let obj = {};
		const gameModes = ["to", "ss"];
		const gamePieces = ["hatch", "cargo"];
		for (let gm of gameModes) {
			obj[gm] = [];
			for (let i = 3; i >= 0; i--) {
				let lvl = i;
				if (lvl===0)
					lvl = 'S';
				let data = [i];
				for (let gp of gamePieces) {
					data.push(
						validFlt(this.props.data[`avg_num_${gm}_${gp}_lv${lvl}`]) + ' @ ' +
						validFlt(this.props.data[`avg_time_${gm}_${gp}_lv${lvl}`]) + ' s'
					);
				}
				obj[gm].push(data);
			}
		}
		return obj;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.teamNum !== this.props.teamNum && this._isMounted)
			this.setState({ rows: this.populateRows(), chartLoaded: false, chartOn: false });
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	async flipState() {
		if (this.state.chartOn && this._isMounted)
			this.setState({ chartOn: false });
		else {
			if (!this.state.chartLoaded && this._isMounted) {
				this.setState({ chartOn: true });
				await this.getChartData();
			}
		}
	}
	async getChartData() {
		console.log('getting cycles chart data');
		let teamNum = this.props.teamNum;
		let res = await fetch(`/api/v1/stats/team/${teamNum}/mbm`); //TODO: only cycles necessary here but all pulled
		if (res.ok) {
			res = await res.json();
			res = res[teamNum];
			let matchList = [];
			let data = {
				to: {
					cargo: {
						lvS: [],
						lv1: [],
						lv2: [],
						lv3: []
					},
					hatch: {
						lvS: [],
						lv1: [],
						lv2: [],
						lv3: []
					}
				},
				ss: {
					cargo: {
						lvS: [],
						lv1: [],
						lv2: [],
						lv3: []
					},
					hatch: {
						lvS: [],
						lv1: [],
						lv2: [],
						lv3: []
					}
				}
			};
			for (let matchNum of Object.keys(res)) {
				matchList.push(`Match ${matchNum}`);
				for (let i = 0; i <= 3; i++) {
					let lv = i === 0 ? 'S' : i;
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
			if (this._isMounted)
				this.setState({ chartLoaded: true });
		}
	}

	render() {
		return (
			<Fragment>
				<CyclesHeader teleop={this.teleop} sandstorm={this.sandstorm} />
				<MDButton flipState={this.flipState} show={this.state.chartOn ? true : false} />
				{!this.state.chartOn && (
					<ATable
						headers={this.state.headers}
						rows={this.state.rows[this.state.gamePeriod]} />
				)}
				{this.state.chartOn && (
					this.state.chartLoaded ? (
						<Chart
							chartData={this[`${this.state.gamePeriod}ChartData`]}
							team={this.props.teamNum}
							title={`${this.state.gamePeriod.toUpperCase()} Cycles: `} />) :
						<p>Chart loading...</p>
				)}
			</Fragment>
		);
	}
	teleop() {
		if (this.state.gamePeriod !== "to")
			this.setState({ gamePeriod: "to" });
	};
	sandstorm() {
		if (this.state.gamePeriod !== "ss")
			this.setState({ gamePeriod: "ss" });
	};
}

class CyclesHeader extends Component {
	render() {
		return (
			<div style={{ float: 'left', position: 'absolute' }}>
				<button className="tab-btns" style={{ marginLeft: "20px" }} onClick={this.props.teleop}>TO</button>
				<button className="tab-btns" style={{ margin: "5px" }} onClick={this.props.sandstorm}>SS</button>
			</div>
		)
	}
}
