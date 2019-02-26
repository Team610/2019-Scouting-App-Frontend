import React, { Component } from "react";

class CyclesSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: "true"
		};
	}
	showMatchData () {
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
							<th>Hatches</th>
							<th>Balls</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable">Level 3</td>
							<td className="analyticsTable">{this.props.data.avg_num_hatch_lv3} @ {this.props.data.avg_time_cargo_lv3} s</td>
							<td className="analyticsTable">{this.props.data.avg_num_cargo_lv3} @ {this.props.data.avg_time_cargo_lv3} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 2</td>
							<td className="analyticsTable">{this.props.data.avg_num_hatch_lv2} @ {this.props.data.avg_time_cargo_lv2} s</td>
							<td className="analyticsTable">{this.props.data.avg_num_cargo_lv2} @ {this.props.data.avg_time_cargo_lv2} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Level 1</td>
							<td className="analyticsTable">{this.props.data.avg_num_hatch_lv1} @ {this.props.data.avg_time_cargo_lv1} s</td>
							<td className="analyticsTable">{this.props.data.avg_num_cargo_lv1} @ {this.props.data.avg_time_cargo_lv1} s</td>
						</tr>
						<tr>
							<td className="analyticsTable">Ship</td>
							<td className="analyticsTable">{this.props.data.avg_num_hatch_lvS} @ {this.props.data.avg_time_cargo_lvS} s</td>
							<td className="analyticsTable">{this.props.data.avg_num_cargo_lvS} @ {this.props.data.avg_time_cargo_lvS} s</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable"/>
							<td className="analyticsTable">
								<button className="matchdata" onClick={this.showMatchData}>View Match Data</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
	// teleop = () => {
	// 	this.setState({ values: [[1, 2], [3, 4], [1, 2], [3, 4]] });
	// 	console.log(this.state.toggle);
	// };

	// sandstorm = () => {
	// 	this.setState({ values: [[3, 4], [1, 2], [3, 4], [1, 2]] });
	// 	console.log(this.state.toggle);
	// };
}

export default CyclesSection;
