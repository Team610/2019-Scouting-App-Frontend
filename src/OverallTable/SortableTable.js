import React, { Component } from 'react';
import './style.css';
import Chart from './Chart/Chart';

class SortableTable extends Component {
	constructor() {
		super();
		this.state = {
			chartData: {}
		}
	}

	componentWillMount() {
		this.getChartData();
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
		return (
			<div>
				<Chart chartData={this.state.chartData} team="610" legendPosition="bottom"/>
				<table className="sortable" id="myTable2">
					<thead>
						<tr>
							<th onClick={() => this.sortTable(0)}>Team</th>
							<th onClick={() => this.sortTable(1)}>Hatch Time</th>
							<th onClick={() => this.sortTable(1)}>Hatch Number</th>
							<th onClick={() => this.sortTable(1)}>Cargo Time</th>
							<th onClick={() => this.sortTable(1)}>Cargo Number</th>
							<th onClick={() => this.sortTable(1)}>Climb Time</th>
							<th onClick={() => this.sortTable(1)}>Climb Level</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td> 610</td>
							<td> 8s</td>
							<td> 6s</td>
							<td>3.5</td>
						</tr>
						<tr>
							<td> 188</td>
							<td>10s</td>
							<td> 5s</td>
							<td>3.2</td>
						</tr>
						<tr>
							<td>4476</td>
							<td>11s</td>
							<td> 8s</td>
							<td>2.5</td>
						</tr>
						<tr>
							<td> 771</td>
							<td>12s</td>
							<td> 4s</td>
							<td>2.8</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default SortableTable;
