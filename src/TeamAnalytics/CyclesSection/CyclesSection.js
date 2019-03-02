import React, { Component } from "react";

class CyclesSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "TO",
			avg_num_hatch_lv3: Math.round(this.props.data.avg_num_to_hatch_lv3 * 1000) / 1000,
			avg_time_hatch_lv3: Math.round(this.props.data.avg_time_to_hatch_lv3 * 1000) / 1000,
			avg_num_cargo_lv3: Math.round(this.props.data.avg_num_to_cargo_lv3 * 1000) / 1000,
			avg_time_cargo_lv3: Math.round(this.props.data.avg_time_to_cargo_lv3 * 1000) / 1000,
			avg_num_hatch_lv2: Math.round(this.props.data.avg_num_to_hatch_lv2 * 1000) / 1000,
			avg_time_hatch_lv2: Math.round(this.props.data.avg_time_to_hatch_lv2 * 1000) / 1000,
			avg_num_cargo_lv2: Math.round(this.props.data.avg_num_to_cargo_lv2 * 1000) / 1000,
			avg_time_cargo_lv2: Math.round(this.props.data.avg_time_to_cargo_lv2 * 1000) / 1000,
			avg_num_hatch_lv1: Math.round(this.props.data.avg_num_to_hatch_lv1 * 1000) / 1000,
			avg_time_hatch_lv1: Math.round(this.props.data.avg_time_to_hatch_lv1 * 1000) / 1000,
			avg_num_cargo_lv1: Math.round(this.props.data.avg_num_to_cargo_lv1 * 1000) / 1000,
			avg_time_cargo_lv1: Math.round(this.props.data.avg_time_to_cargo_lv1 * 1000) / 1000,
			avg_num_hatch_lvS: Math.round(this.props.data.avg_num_to_hatch_lvS * 1000) / 1000,
			avg_time_hatch_lvS: Math.round(this.props.data.avg_time_to_hatch_lvS * 1000) / 1000,
			avg_num_cargo_lvS: Math.round(this.props.data.avg_num_to_cargo_lvS * 1000) / 1000,
			avg_time_cargo_lvS: Math.round(this.props.data.avg_time_to_cargo_lvS * 1000) / 1000
		};
	}
	showMatchData() {
		console.log("show cycles match data");
	}
	render() {
		return (
			<div>
				<h1 className="comp">
					<table className="header">
						<thead>
							<tr>
								<td className="name">Cycles</td>
								<td className="b1">
									<button className="b11" onClick={() => this.teleop()}>TO</button>
								</td>
								<td className="b2">
									<button className="b21" onClick={() => this.sandstorm()}>SS</button>
								</td>
							</tr>
						</thead>
					</table>
				</h1>
				<table className="analyticsTable">
					<thead>
						<tr>
							<th />
							<th>Hatch</th>
							<th>Cargo</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable">Level 3</td>
							<td className="analyticsTable">{this.state.avg_num_hatch_lv3} @ {this.state.avg_time_hatch_lv3} s</td>
							<td className="analyticsTable">{this.state.avg_num_cargo_lv3} @ {this.state.avg_time_cargo_lv3} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 2</td>
							<td className="analyticsTable">{this.state.avg_num_hatch_lv2} @ {this.state.avg_time_hatch_lv2} s</td>
							<td className="analyticsTable">{this.state.avg_num_cargo_lv2} @ {this.state.avg_time_cargo_lv2} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 1</td>
							<td className="analyticsTable">{this.state.avg_num_hatch_lv1} @ {this.state.avg_time_hatch_lv1} s</td>
							<td className="analyticsTable">{this.state.avg_num_cargo_lv1} @ {this.state.avg_time_cargo_lv1} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Ship</td>
							<td className="analyticsTable">{this.state.avg_num_hatch_lvS} @ {this.state.avg_time_hatch_lvS} s</td>
							<td className="analyticsTable">{this.state.avg_num_cargo_lvS} @ {this.state.avg_time_cargo_lvS} s</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable" />
							<td className="analyticsTable">
								<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
	teleop() {
		if (this.state.mode !== "TO") {
			this.setState({
				mode:"TO",
				avg_num_hatch_lv3: Math.round(this.props.data.avg_num_to_hatch_lv3 * 1000) / 1000,
				avg_time_hatch_lv3: Math.round(this.props.data.avg_time_to_hatch_lv3 * 1000) / 1000,
				avg_num_cargo_lv3: Math.round(this.props.data.avg_num_to_cargo_lv3 * 1000) / 1000,
				avg_time_cargo_lv3: Math.round(this.props.data.avg_time_to_cargo_lv3 * 1000) / 1000,
				avg_num_hatch_lv2: Math.round(this.props.data.avg_num_to_hatch_lv2 * 1000) / 1000,
				avg_time_hatch_lv2: Math.round(this.props.data.avg_time_to_hatch_lv2 * 1000) / 1000,
				avg_num_cargo_lv2: Math.round(this.props.data.avg_num_to_cargo_lv2 * 1000) / 1000,
				avg_time_cargo_lv2: Math.round(this.props.data.avg_time_to_cargo_lv2 * 1000) / 1000,
				avg_num_hatch_lv1: Math.round(this.props.data.avg_num_to_hatch_lv1 * 1000) / 1000,
				avg_time_hatch_lv1: Math.round(this.props.data.avg_time_to_hatch_lv1 * 1000) / 1000,
				avg_num_cargo_lv1: Math.round(this.props.data.avg_num_to_cargo_lv1 * 1000) / 1000,
				avg_time_cargo_lv1: Math.round(this.props.data.avg_time_to_cargo_lv1 * 1000) / 1000,
				avg_num_hatch_lvS: Math.round(this.props.data.avg_num_to_hatch_lvS * 1000) / 1000,
				avg_time_hatch_lvS: Math.round(this.props.data.avg_time_to_hatch_lvS * 1000) / 1000,
				avg_num_cargo_lvS: Math.round(this.props.data.avg_num_to_cargo_lvS * 1000) / 1000,
				avg_time_cargo_lvS: Math.round(this.props.data.avg_time_to_cargo_lvS * 1000) / 1000
			});
		}
	};
	sandstorm() {
		if (this.state.mode !== "SS") {
			this.setState({
				mode: "SS",
				avg_num_hatch_lv3: Math.round(this.props.data.avg_num_ss_hatch_lv3 * 1000) / 1000,
				avg_time_hatch_lv3: Math.round(this.props.data.avg_time_ss_hatch_lv3 * 1000) / 1000,
				avg_num_cargo_lv3: Math.round(this.props.data.avg_num_ss_cargo_lv3 * 1000) / 1000,
				avg_time_cargo_lv3: Math.round(this.props.data.avg_time_ss_cargo_lv3 * 1000) / 1000,
				avg_num_hatch_lv2: Math.round(this.props.data.avg_num_ss_hatch_lv2 * 1000) / 1000,
				avg_time_hatch_lv2: Math.round(this.props.data.avg_time_ss_hatch_lv2 * 1000) / 1000,
				avg_num_cargo_lv2: Math.round(this.props.data.avg_num_ss_cargo_lv2 * 1000) / 1000,
				avg_time_cargo_lv2: Math.round(this.props.data.avg_time_ss_cargo_lv2 * 1000) / 1000,
				avg_num_hatch_lv1: Math.round(this.props.data.avg_num_ss_hatch_lv1 * 1000) / 1000,
				avg_time_hatch_lv1: Math.round(this.props.data.avg_time_ss_hatch_lv1 * 1000) / 1000,
				avg_num_cargo_lv1: Math.round(this.props.data.avg_num_ss_cargo_lv1 * 1000) / 1000,
				avg_time_cargo_lv1: Math.round(this.props.data.avg_time_ss_cargo_lv1 * 1000) / 1000,
				avg_num_hatch_lvS: Math.round(this.props.data.avg_num_ss_hatch_lvS * 1000) / 1000,
				avg_time_hatch_lvS: Math.round(this.props.data.avg_time_ss_hatch_lvS * 1000) / 1000,
				avg_num_cargo_lvS: Math.round(this.props.data.avg_num_ss_cargo_lvS * 1000) / 1000,
				avg_time_cargo_lvS: Math.round(this.props.data.avg_time_ss_cargo_lvS * 1000) / 1000
			});
		}
	};
}

export default CyclesSection;
