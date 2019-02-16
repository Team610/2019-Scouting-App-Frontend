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
				<table>
					<thead>
						<tr>
							<th />
							<th>Hatches</th>
							<th>Balls</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Level 3</td>
							<td>{this.props.data.hatch_lv3.num.avg} @ {this.props.data.hatch_lv3.time.avg} s</td>
							<td>{this.props.data.cargo_lv3.num.avg} @ {this.props.data.cargo_lv3.time.avg} s</td>
						</tr>
						<tr>
							<td>Level 2</td>
							<td>{this.props.data.hatch_lv2.num.avg} @ {this.props.data.hatch_lv2.time.avg} s</td>
							<td>{this.props.data.cargo_lv2.num.avg} @ {this.props.data.cargo_lv2.time.avg} s</td>
						</tr>
						<tr>
							<td>Level 1</td>
							<td>{this.props.data.hatch_lv1.num.avg} @ {this.props.data.hatch_lv1.time.avg} s</td>
							<td>{this.props.data.cargo_lv1.num.avg} @ {this.props.data.cargo_lv1.time.avg} s</td>
						</tr>
						<tr>
							<td>Ship</td>
							<td>{this.props.data.hatch_lvS.num.avg} @ {this.props.data.hatch_lvS.time.avg} s</td>
							<td>{this.props.data.cargo_lvS.num.avg} @ {this.props.data.cargo_lvS.time.avg} s</td>
						</tr>
						<tr>
							<td />
							<td />
							<td>
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
