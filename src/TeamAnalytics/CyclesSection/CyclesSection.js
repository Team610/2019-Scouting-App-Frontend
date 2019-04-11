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

		this.state = { gamePeriod: 'to', chartLoaded: false, chartOn: false, headers: this.populateHeaders(), rows: this.populateRows() };
	}

	populateHeaders() {
		return ["Level", "Hatch", "Cargo"];
	}
	populateRows() {
		let obj = {};
		const gameModes = ['to', 'ss'];
		const gamePieces = ['hatch', 'cargo'];
		for (let gm of gameModes) {
			obj[gm] = [];
			for (let i = 3; i >= 0; i--) {
				let lvl = i;
				if (lvl === 0)
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
		this.setState({ chartOn: !this.state.chartOn });
		if (!this.state.chartLoaded)
			await this.getChartData();
	}
	async getChartData() {
		console.log('getting cycles chart data');
		let teamNum = this.props.teamNum;
		let res = await fetch(`/api/v1/stats/team/${teamNum}/mbm`); //TODO: only cycles necessary here but all pulled
		if (res.ok) {
			res = await res.json();
			res = res[teamNum];
			let matchList = [];
			let data = {};
			const gameModes = ['to', 'ss'];
			const gamePieces = ['cargo', 'hatch'];
			for (let matchNum of Object.keys(res)) {
				matchList.push(`Q${matchNum}`);
				for (let gm of gameModes) {
					if (!data[gm]) data[gm] = {};
					for (let gp of gamePieces) {
						if (!data[gm][gp]) data[gm][gp] = {};
						for (let i = 0; i <= 3; i++) {
							let lv = i === 0 ? 'S' : i;
							if (!data[gm][gp][`lv${lv}`]) data[gm][gp][`lv${lv}`] = [];
							data[gm][gp][`lv${lv}`].push(res[matchNum][`${gm}_${gp}_lv${lv}`].length);
						}
					}
				}
			}
			const colours = {
				cargo: [
					'#22f93f', '#47e5da', '#4286f4', '#8f48f2'
				],
				hatch: [
					'#ff14c4', '#ff2b14', '#ff9019', '#f7f31d'
				]
			};
			for (let gm of gameModes) {
				this[`${gm}ChartData`] = { labels: matchList, stacked: true, datasets: [] };
				for (let gp of gamePieces) {
					for (let lvCnt = 0; lvCnt <= 3; lvCnt++) {
						const lv = lvCnt === 0 ? 'S' : lvCnt;
						this[`${gm}ChartData`].datasets.push({
							label: `${gp} lv${lv}`,
							data: data[gm][gp][`lv${lv}`],
							backgroundColor: colours[gp][lvCnt],
							stack: gp
						});
					}
				}
			}
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
