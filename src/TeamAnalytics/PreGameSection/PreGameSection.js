import React, { Component, Fragment } from 'react';
import Chart from '../Components/Chart';
import MDButton from '../Components/MatchDataButton';
import ATable from '../Components/AnalyticsTable';

export default class PreGameSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);

		this.getChartData = this.getChartData.bind(this);
		this.flipState = this.flipState.bind(this);

		this.state = { chartLoaded: false, chartOn: false };
		this.headers = ["", "Hatches", "Cargo"];
		this.rows = [
			[
				"Ship Preload",
				this.validInt(this.props.data.tot_ship_preload.hatch),
				this.validInt(this.props.data.tot_ship_preload.cargo)
			],
			[
				"Robot Preload",
				this.validInt(this.props.data.tot_robot_preload.hatch),
				this.validInt(this.props.data.tot_robot_preload.cargo)
			]
		];
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

	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	async flipState() {
		if (this.state.chartOn)
			this.setState({ chartOn: false });
		else {
			this.setState({ chartOn: true });
			if (!this.state.chartLoaded)
				await this.getChartData();
		}
	}
	async getChartData() {
		console.log('getting preload chart data');
		let teamNum = this.props.teamNum;
		let res = await fetch(`/api/v1/stats/team/${teamNum}/mbm`);
		if (res.ok) {
			res = await res.json();
			res = res[teamNum];
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
			this.chartData = {
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
			}
			if (this._isMounted)
				this.setState({ chartLoaded: true });
		}
	}

	render() {
		return (
			<Fragment>
				<MDButton flipState={this.flipState} />
				{!this.state.chartOn && (
					<ATable
						headers={this.headers}
						rows={this.rows} />
				)}
				{this.state.chartOn && (
					this.state.chartLoaded ? (
						<Chart
							chartData={this.chartData}
							team={this.props.teamNum}
							title={`Preloads: `} />) :
						<p>Chart loading...</p>
				)}
			</Fragment>
		);
	}
}
