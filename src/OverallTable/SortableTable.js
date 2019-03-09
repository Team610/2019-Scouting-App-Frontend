import React, { Component } from 'react';
import './style.css';

class SortableTable extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);

		this.state = {
			dataLoaded: false
		}
		this.getData = this.getData.bind(this);
		this.getData();
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

	sortTable = (n) => {
		//https://www.w3schools.com/jsref/met_table_insertrow.asp
		let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
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
					if (Number(x.innerHTML) > Number(y.innerHTML)) {
						shouldSwitch = true;
						break;
					}
				} else if (dir === "desc") {
					if (Number(x.innerHTML) < Number(y.innerHTML)) {
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
		if (!this.state.dataLoaded) {
			return (<p>Loading data...</p>);
		}
		let rows = [];
		for (let team of Object.keys(this.data)) {
			let avg_num_hatch = this.validFlt(this.data[team].avg_num_ss_hatch_tot + this.data[team].avg_num_to_hatch_tot);
			let avg_time_hatch = this.validFlt(this.data[team].avg_time_ss_hatch_tot * this.data[team].avg_num_ss_hatch_tot / avg_num_hatch + this.data[team].avg_time_to_hatch_tot * this.data[team].avg_num_to_hatch_tot / avg_num_hatch);
			let avg_num_cargo = this.validFlt(this.data[team].avg_num_ss_cargo_tot + this.data[team].avg_num_to_cargo_tot);
			let avg_time_cargo = this.validFlt(this.data[team].avg_time_ss_cargo_tot * this.data[team].avg_num_ss_cargo_tot / avg_num_cargo + this.data[team].avg_time_to_cargo_tot * this.data[team].avg_num_to_cargo_tot / avg_num_cargo);
			let lvl2_climbs = this.validInt(this.data[team].tot_num_climb_lvl[2]);
			let lvl3_climbs = this.validInt(this.data[team].tot_num_climb_lvl[3]);
			let tot_climbs = this.validInt(lvl2_climbs + lvl3_climbs);
			let avg_time_climb = this.validFlt(this.data[team].avg_time_climb_lv2 * lvl2_climbs / tot_climbs + this.data[team].avg_time_climb_lv3 * lvl3_climbs / tot_climbs);
			rows.push(
				<tr key={team}>
					<td className='overall-freeze-col'>{team}</td>
					<td className='overall-data'>{avg_num_hatch}</td>
					<td className='overall-data'>{avg_time_hatch}</td>
					<td className='overall-data'>{avg_num_cargo}</td>
					<td className='overall-data'>{avg_time_cargo}</td>
					<td className='overall-data'>{tot_climbs}</td>
					<td className='overall-data'>{avg_time_climb}</td>
				</tr>
			);
		}
		return (
			<div style={{
				overflowX:"scroll",
				marginLeft: "59px",
				marginTop: "28px"
			}}>
				<table className="overall-table" id="myTable2">
					<thead>
						<tr>
							<th className='overall-freeze-col' onClick={() => this.sortTable(0)}>Team</th>
							<th className='overall-data' onClick={() => this.sortTable(1)}>Hatch #</th>
							<th className='overall-data' onClick={() => this.sortTable(2)}>Hatch (s)</th>
							<th className='overall-data' onClick={() => this.sortTable(3)}>Cargo #</th>
							<th className='overall-data' onClick={() => this.sortTable(4)}>Cargo (s)</th>
							<th className='overall-data' onClick={() => this.sortTable(5)}>Climb #</th>
							<th className='overall-data' onClick={() => this.sortTable(6)}>Climb (s)</th>
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
