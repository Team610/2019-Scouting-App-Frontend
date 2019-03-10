import React, { Component } from 'react';
import './style.css';

class SortableTable extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);
		this.calcCol = this.calcCol.bind(this);
		this.processNum = this.processNum.bind(this);

		this.columns = [
			//fields defined using post-script; data[...] denotes number from raw stats, alias[...] denotes already calc'd number
			{
				name: "Hatch #",
				field: "flt.data.avg_num_ss_hatch_tot flt.data.avg_num_to_hatch_tot +",
				alias: "avg_num_hatch",
				type: "flt"
			},
			{
				name: "Hatch (s)",
				field: "flt.alias.avg_num_hatch flt.data.avg_time_ss_hatch_tot flt.data.avg_num_ss_hatch_tot * flt.data.avg_time_to_hatch_tot flt.data.avg_num_to_hatch_tot * + /",
				alias: "avg_time_hatch",
				type: "flt" //Weighted average between sandstorm and teleop hatches
			},
			{
				name: "Cargo #",
				field: "flt.data.avg_num_ss_cargo_tot flt.data.avg_num_to_cargo_tot +",
				alias: "avg_num_cargo",
				type: "flt"
			},
			{
				name: "Cargo (s)",
				field: "flt.alias.avg_num_cargo flt.data.avg_time_ss_cargo_tot flt.data.avg_num_ss_cargo_tot * flt.data.avg_time_to_cargo_tot flt.data.avg_num_to_cargo_tot * + /",
				alias: "avg_time_cargo",
				type: "flt"
			},
			{
				name: "Climb #",
				field: "int.data.tot_num_climb_lvl.2 int.data.tot_num_climb_lvl.3 +",
				alias: "tot_climbs",
				type: "int"
			},
			{
				name: "Climb (s)",
				field: "int.alias.tot_climbs flt.data.avg_time_climb_lv2 int.data.tot_num_climb_lvl.2 * flt.data.avg_time_climb_lv3 int.data.tot_num_climb_lvl.3 * + /",
				alias: "avg_time_climb", //Weighted average between lv2 and lv3 climbs
				type: "flt"
			}
		]
		this.state = {
			dataLoaded: false,
			columns: ["avg_num_hatch", "avg_time_hatch", "avg_num_cargo", "avg_time_cargo", "tot_climbs", "avg_time_climb"],
			dir: 'd',
			lastCol: 'team'
		}
		this.getData = this.getData.bind(this);
		this.getData();
	}
	//utils
	validFlt(num) {
		let a = Number(num);
		if (Number.isNaN(num) || !num) a = 0;
		return parseFloat(Math.round(a * 1000) / 1000).toFixed(3);
	}
	validInt(int) {
		let a = Number(int);
		if (Number.isNaN(int) || !int) a = 0;
		return parseInt(a);
	}

	getData() {
		fetch('/api/v1/stats/teams/agg').then((res) => {
			if (!res.ok) {
				throw new Error("could not load data");
			}
			res.json().then((json) => {
				this.data = json;
				this.alias = {};
				for (let team of Object.keys(this.data)) {
					this.alias[team] = {};
					for (let col of this.columns) {
						this.alias[team][col.alias] = col.type === 'flt' ? this.validFlt(this.calcCol(col.field, team)) : this.validInt(this.calcCol(col.field, team));
					}
				}
				console.log('got all match-by-match stats');
				// console.log(this.alias);
				this.setState({
					dataLoaded: true,
					order: Object.keys(this.data)
				});
			});
		}).catch((err) => {
			this.setState({
				dataLoaded: false,
				err: err
			});
		});
	}
	calcCol(field, team) {
		let operands = field.split(" ");
		let stack = [];
		for (let i = 0; i < operands.length; i++) {
			if (typeof operands[i] === 'string' && operands[i].length === 1) {
				let o1 = this.processNum(stack.pop(), team);
				let o2 = this.processNum(stack.pop(), team);

				let op = operands[i];
				if (op === '+') {
					stack.push(o1 + o2);
				} else if (op === '-') { //Minuend is second, subtrahend is first
					stack.push(o1 - o2);
				} else if (op === '*') {
					stack.push(o1 * o2);
				} else if (op === '/') { //Numerator is second, denominator is first
					stack.push(o1 / o2);
				} else if (op === '^') { //Base is second, power is first
					stack.push(Math.pow(o1, o2));
				} else {
					stack.push(0);
					console.log(`operand not properly set: ${op}`);
				}
			} else {
				stack.push(operands[i]);
			}
		}
		return stack[0];
	}
	processNum(arr, team) {
		if (typeof arr === 'number') {
			return arr;
		} else {
			arr = arr.split('.');
			let num;
			if (arr[1] === 'data') {
				num = this.data[team][arr[2]];
			} else if (arr[1] === 'alias') {
				num = this.alias[team][arr[2]];
			} else {
				num = 0;
				console.log(`Value source not set properly: ${arr[1]}`);
			}
			if (arr[3]) {
				num = num[arr[3]] ? num[arr[3]] : 0;
			}
			return Number(num);
		}
	}

	sortTable = (col) => {
		//If the column is the same as before, flip the direction. Otherwise, keep the same direction.
		let dir = col === this.state.lastCol ? this.state.dir === 'a' ? 'd' : 'a' : this.state.dir;

		let newOrder = this.state.order;
		//handle special case of sorting team, since sorted list already exists
		if (col === 'team') {
			if (dir === 'd') {
				newOrder = Object.keys(this.alias);
			} else if (dir === 'a') {
				newOrder = Object.keys(this.alias).reverse();
			}
		} else {
			//Insertion sort up until the max value
			let max = newOrder.length;
			for (let i = 0; i < max; i++) {
				//handle special case of val is 0: dump to bottom of list, don't actually increment, and reduce max
				if (this.alias[newOrder[i]][col] === 0 || this.alias[newOrder[i]][col] === '0.000') {
					let temp = newOrder[max - 1];
					newOrder[max - 1] = newOrder[i];
					newOrder[i] = temp;
					max--;
					i--;
					continue;
				}

				let j = i;
				//If arr[j] compared with arr[j-1] needs to be swapped, swap. Else, arr[j] is already in place.
				while (j > 0) {
					let cur = Number(this.alias[newOrder[j]][col]);
					let pre = Number(this.alias[newOrder[j - 1]][col]);
					if ((dir === 'd' && cur > pre) || (dir === 'a' && cur < pre)) {
						//swap
						let temp = newOrder[j - 1];
						newOrder[j - 1] = newOrder[j];
						newOrder[j] = temp;
						j--;
					} else {
						break;
					}
				}
			}
		}
		this.setState({
			order: newOrder,
			dir: dir,
			lastCol: col
		});
	}
	render() {
		if (this.state.err) {
			return (<p>Data could not load.</p>);
		}
		if (!this.state.dataLoaded) {
			return (<p>Loading data...</p>);
		}
		let heads = [
			<th key='Team' className='overall-freeze-col' onClick={() => this.sortTable('team')}>Team {this.state.lastCol === 'team' ? this.state.dir === 'a' ? '↑' : '↓' : null}</th>
		];
		for (let statCol of this.columns) {
			for (let i = 0; i < this.state.columns.length; i++) {
				if (statCol.alias === this.state.columns[i]) {
					heads.push(
						<th
							key={this.state.columns[i]}
							className='overall-data'
							onClick={() => this.sortTable(statCol.alias)}
						>
							{statCol.name} {statCol.alias === this.state.lastCol ? this.state.dir === 'a' ? '\u2191' : '\u2193' : null}
						</th>
					);
					break;
				}
			}
		}

		let rows = [];
		for (let team of this.state.order) {
			let teamData = [];
			for (let statCol of this.columns) {
				for (let i = 0; i < this.state.columns.length; i++) {
					if (statCol.alias === this.state.columns[i]) {
						teamData.push(
							<td key={this.state.columns[i]} className='overall-data'>{this.alias[team][statCol.alias]}</td>
						);
						break;
					}
				}
			}
			rows.push(
				<tr key={team}>
					<td className='overall-freeze-col'>{team}</td>
					{teamData}
				</tr>
			);
		}

		return (
			<div style={{
				overflowX: "scroll",
				marginLeft: "68px",
				marginTop: "28px"
			}}>
				<table className="overall-table" id="overallTable">
					<thead>
						<tr>{heads}</tr>
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
