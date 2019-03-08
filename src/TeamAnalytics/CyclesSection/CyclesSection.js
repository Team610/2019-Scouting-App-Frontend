import React, { Component } from "react";

class CyclesSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);

		this.state = {mode: "to"};
		this.data = {
			ss: {
				hatch: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lv3),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lv2),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lv1),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_ss_hatch_lvS),
						num: this.validFlt(this.props.data.avg_num_ss_hatch_lvS)
					}
				},
				cargo: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lv3),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lv2),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lv1),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_ss_cargo_lvS),
						num: this.validFlt(this.props.data.avg_num_ss_cargo_lvS)
					}
				}
			},
			to: {
				hatch: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lv3),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lv2),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lv1),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_to_hatch_lvS),
						num: this.validFlt(this.props.data.avg_num_to_hatch_lvS)
					}
				},
				cargo: {
					lv3: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lv3),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lv3)
					},
					lv2: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lv2),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lv2)
					},
					lv1: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lv1),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lv1)
					},
					lvS: {
						time: this.validFlt(this.props.data.avg_time_to_cargo_lvS),
						num: this.validFlt(this.props.data.avg_num_to_cargo_lvS)
					}
				}
			}
		}
	}
	//utils
	validFlt(num) {
		let a = num;
		if(Number.isNaN(num)||!num) a=0;
		return parseFloat(Math.round(a * 1000) / 1000).toFixed(3);
	}
	validInt(int) {
		let a = int;
		if(Number.isNaN(int)||!int) a=0;
		return parseInt(a);
	}

	showMatchData() {
		console.log("show cycles match data");
	}
	render() {
		let rows = [];
		for(let i=3; i>=0; i--) {
			let lvl = i!==0?i:'S';
			rows.push(
				<tr key={lvl}>
					<td className="analyticsTable">{lvl}</td>
					<td className="analyticsTable">{this.data[this.state.mode].hatch[`lv${lvl}`].num} @ {this.data[this.state.mode].hatch[`lv${lvl}`].time} s</td>
					<td className="analyticsTable">{this.data[this.state.mode].cargo[`lv${lvl}`].num} @ {this.data[this.state.mode].cargo[`lv${lvl}`].time} s</td>
				</tr>
			);
		}
		return (
			<div className="analytics-section">
				<h1 className="comp">
					Cycles
					<button className="tab-btns" style={{marginLeft:"20px"}} onClick={() => this.teleop()}>TO</button>
					<button className="tab-btns" style={{margin:"5px"}} onClick={() => this.sandstorm()}>SS</button>
				</h1>
				<table className="analyticsTable">
					<thead>
						<tr>
							<th>Level</th>
							<th>Hatch</th>
							<th>Cargo</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<br/>
				<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
				<br/>
			</div>
		);
	}
	teleop() {
		if (this.state.mode !== "to") {
			this.setState({mode: "to"});
		}
	};
	sandstorm() {
		if (this.state.mode !== "ss") {
			this.setState({mode: "ss"});
		}
	};
}

export default CyclesSection;
