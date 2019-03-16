import React, { Component, Fragment } from "react";
import Chart from '../Components/Chart';
import { validFlt, validInt } from '../Components/Util';
import MDButton from '../Components/MatchDataButton';
import ATable from '../Components/AnalyticsTable';

export default class EndGameSection extends Component {
	constructor(props) {
		super(props);
		this.getChartData = this.getChartData.bind(this);
		this.flipState = this.flipState.bind(this);
		this.populateHeaders = this.populateHeaders.bind(this);
		this.populateRows = this.populateRows.bind(this);
		this.state = { chartLoaded: false, chartOn: false, headers: this.populateHeaders(), rows: this.populateRows() };
	}

	populateHeaders() {
		return ['', 'Number', 'Time'];
	}
	populateRows() {
		return [
			[
				'Level 3',
				validInt(this.props.data.tot_num_climb_lvl[3]),
				validFlt(this.props.data.avg_time_climb_lv3)
			],
			[
				'Level 2',
				validInt(this.props.data.tot_num_climb_lvl[2]),
				validFlt(this.props.data.avg_time_climb_lv2)
			],
			[
				'Level 1',
				validInt(this.props.data.tot_num_climb_lvl[1]),
				validFlt(this.props.data.avg_time_climb_lv1)
			]
		];
	}

	componentDidUpdate(prevProps) {
		if (prevProps.teamNum !== this.props.teamNum && this._isMounted)
			this.setState({ rows: this.populateRows(), chartLoaded: false });
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
			if (!this.state.chartLoaded && this._isMounted)
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
						headers={this.state.headers}
						rows={this.state.rows} />
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
