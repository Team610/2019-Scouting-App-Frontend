import React, { Component, Fragment } from "react";
import Chart from '../Components/Chart';
import { validFlt, validInt } from '../Components/Util';
import MDButton from '../Components/MatchDataButton';
import ATable from '../Components/AnalyticsTable';

export default class DefenseSection extends Component {
	constructor(props) {
		super(props);
		this.getChartData = this.getChartData.bind(this);
		this.flipState = this.flipState.bind(this);
		this.populateHeaders = this.populateHeaders.bind(this);
		this.populateRows = this.populateRows.bind(this);
		this.state = { chartLoaded: false, chartOn: false, headers: this.populateHeaders(), rows: this.populateRows() };
	}

	populateHeaders() {
		return ["", "Total Time", "Matches"];
	}
	populateRows() {
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
		for (let val of arr) {
			let row = [];
			row.push(
				val.label,
				validFlt(this.props.data[`tot_time_def${val.name}`]),
				validInt(this.props.data[`tot_matches_def${val.name}`])
			);
			rows.push(row);
		}
		return rows;
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
		if (this.state.chartOn) //TODO: where to put this._isMounted check?
			this.setState({ chartOn: false });
		else {
			this.setState({ chartOn: true });
			if (!this.state.chartLoaded && this._isMounted)
				await this.getChartData();
		}
	}
	async getChartData() {
		console.log('getting defense chart data');
		let teamNum = this.props.teamNum;
		let res = await fetch(`/api/v1/stats/team/${teamNum}/mbm`);
		if (res.ok) {
			res = await res.json();
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
						if (chartData[i].label === val.label)
							chartData[i].data.push(sum);
					}
				}
			}
			this.chartData = {
				labels: matchList,
				datasets: chartData
			};
			if (this._isMounted)
				this.setState({ chartLoaded: true });
		}
	}

	render() {
		return (
			<Fragment>
				{!this.state.chartOn && (
					<ATable
						headers={this.state.headers}
						rows={this.state.rows} />
				)}
				<MDButton flipState={this.flipState} />
				{this.state.chartOn && (
					this.state.chartLoaded ? (
						<Chart
							chartData={this.chartData}
							team={this.props.teamNum}
							title={`Defense: `} />) :
						<p>Chart loading...</p>
				)}
			</Fragment>
		);
	}
}
