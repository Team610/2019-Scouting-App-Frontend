import React, { Component } from 'react';
import './style.css';
import Chart from './Chart/Chart';

class SortableTable extends Component {
	constructor() {
		super();
		this.state = {
			chartData: {},
			dataLoaded: false
		}
		this.getData = this.getData.bind(this);
	}
	componentDidMount() {
		// this.getChartData();
		this.getData();
	}
	getData() {
		fetch('/api/v1/stats/teams/agg').then((res) => {
			res.json().then((json) => {
				this.data = json;
				this.setState({
					dataLoaded: true
				});
			});
		});
	}

	getChartData() {
		// Ajax calls here
		this.setState({
			chartData: {
				labels: ['Match 1', 'Match 2', 'Match 34', 'Match 43', '44', 'Match 45'],
				datasets: [
					{
						label: 'Time',
						data: [
							3,
							5,
							3,
							3,
							2,
							1
						],
						backgroundColor: [
							'rgba(255, 99, 132, 0.6)',
							'rgba(54, 162, 235, 0.6)',
							'rgba(255, 206, 86, 0.6)',
							'rgba(75, 192, 192, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 64, 0.6)',
							'rgba(255, 99, 132, 0.6)'
						]
					}
				]
			}
		});
	}

	sortTable = (n) => {
		//https://www.w3schools.com/jsref/met_table_insertrow.asp
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("myTable2");
		switching = true;
		dir = "asc";
		while (switching) {
			switching = false;
			rows = table.rows;
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("TD")[n];
				y = rows[i + 1].getElementsByTagName("TD")[n];
				if (dir === "asc") {
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				} else if (dir === "desc") {
					if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
						shouldSwitch = true;
						break;
					}
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount++;
			} else {
				if (switchcount === 0 && dir === "asc") {
					dir = "desc";
					switching = true;
				}
			}
		}
	}
	render() {
		//<Chart chartData={this.state.chartData} team="610" legendPosition="bottom"/>
		if(!this.state.dataLoaded) {
			return(<p>Loading data</p>);
		}
		console.log(this.data[188]);
		let rows = [];
		for (let team of Object.keys(this.data)) {
			let avg_num_hatch = Math.round((this.data[team].avg_num_ss_hatch_tot + this.data[team].avg_num_to_hatch_tot) * 1000) / 1000;
			let avg_time_hatch = Math.round((this.data[team].avg_time_ss_hatch_tot * this.data[team].avg_num_ss_hatch_tot / avg_num_hatch + this.data[team].avg_time_to_hatch_tot * this.data[team].avg_num_to_hatch_tot / avg_num_hatch) * 1000) / 1000;
			let avg_num_cargo = Math.round((this.data[team].avg_num_ss_cargo_tot + this.data[team].avg_num_to_cargo_tot) * 1000) / 1000;
			let avg_time_cargo = Math.round((this.data[team].avg_time_ss_cargo_tot * this.data[team].avg_num_ss_cargo_tot / avg_num_cargo + this.data[team].avg_time_to_cargo_tot * this.data[team].avg_num_to_cargo_tot / avg_num_cargo) * 1000) / 1000;
			let lvl2_climbs = this.data[team].tot_num_climb_lvl[2]===undefined?0:parseInt(this.data[team].tot_num_climb_lvl[2]);
			let lvl3_climbs = this.data[team].tot_num_climb_lvl[3]===undefined?0:parseInt(this.data[team].tot_num_climb_lvl[3]);
			let tot_climbs = lvl2_climbs+lvl3_climbs;
			let avg_time_climb = Math.round(this.data[team].avg_time_climb_tot*1000)/1000;
			rows.push(<tr key={team}>
				<td>{team}</td>
				<td>{avg_num_hatch}</td>
				<td>{avg_time_hatch}</td>
				<td>{avg_num_cargo}</td>
				<td>{avg_time_cargo}</td>
				<td>{tot_climbs}</td>
				<td>{avg_time_climb}</td>
			</tr>);
		}
		return (
			<div>
				<table className="sortable" id="myTable2">
					<thead>
						<tr>
							<th onClick={() => this.sortTable(0)}>Team</th>
							<th onClick={() => this.sortTable(1)}>Hatch #</th>
							<th onClick={() => this.sortTable(2)}>Hatch (s)</th>
							<th onClick={() => this.sortTable(3)}>Cargo #</th>
							<th onClick={() => this.sortTable(4)}>Cargo (s)</th>
							<th onClick={() => this.sortTable(5)}>Climb #</th>
							<th onClick={() => this.sortTable(6)}>Climb (s)</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		);
	}
}

export default SortableTable;
