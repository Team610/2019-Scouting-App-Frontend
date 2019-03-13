import React, { Component, Fragment } from "react";
import Chart from '../Components/Chart';
import MDButton from '../Components/MatchDataButton';
import ATable from '../Components/AnalyticsTable';

export default class EndGameSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);

		this.getChartData = this.getChartData.bind(this);
		this.flipState = this.flipState.bind(this);

		this.state = { chartLoaded: false, chartOn: false };
		this.headers = ['', 'Number', 'Time'];
		this.rows = [
			[
				'Level 3',
				this.validInt(this.props.data.tot_num_climb_lvl[3]),
				this.validFlt(this.props.data.avg_time_climb_lv3)
			],
			[
				'Level 2',
				this.validInt(this.props.data.tot_num_climb_lvl[2]),
				this.validFlt(this.props.data.avg_time_climb_lv2)
			],
			[
				'Level 1',
				this.validInt(this.props.data.tot_num_climb_lvl[1]),
				this.validFlt(this.props.data.avg_time_climb_lv1)
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
		console.log('getting climb chart data');
		let teamNum = this.props.teamNum;
		let res = await fetch(`/api/v1/stats/team/${teamNum}/mbm`);
		if (res.ok) {
			res = await res.json();
			res = res[teamNum];
			let matchList = [];
			let climbLvl = [];
			for (let matchNum of Object.keys(res)) {
				matchList.push(`Match ${matchNum}`);
				climbLvl.push(res[matchNum].climb_lvl[0]);
			}
			this.chartData = {
				labels: matchList,
				datasets: [{
					label: "Climb Level",
					data: climbLvl,
					backgroundColor: '#00EE00'
				}]
			};
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
							title={`Climbs: `} />) :
						<p>Chart loading...</p>
				)}
			</Fragment>
		);
	}
}
