import React, { Component, Fragment } from 'react';

export default class CommentsSection extends Component {
	constructor(props) {
		super(props);
		//util funcs
		this.validFlt = this.validFlt.bind(this);
		this.validInt = this.validInt.bind(this);
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

	showMatchData() {
		console.log("showing comment match data");
	}
	render() {
		let otherComments = [];
		for (let cmt of Object.keys(this.props.data.all_other_comments)) {
			if (cmt !== 'blank' && cmt !== '') {
				otherComments.push(
					<Fragment key={cmt}>
						<tr><td>{cmt}</td></tr>
						<tr><td style={{ visibility: "hidden" }}>invisible text</td></tr>
					</Fragment>
				);
			}
		}
		return (
			<div>
				<h1 className="comp">Comments</h1>
				<table className="analyticsTable">
					<thead>
						<tr>
							<th />
							<th>Type</th>
							<th>Occurences</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">No climb attempted</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_climb_states.climb_no_attempt)}</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Failed climbs</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_climb_states.climb_no)}</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Tipped climbs</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_climb_states.climb_fall)}</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Tipped another robot while climbing</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_climb_states.climb_tipper)}</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Tipped <strong>by</strong> another robot while climbing</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_climb_states.climb_tipped)}</td>
						</tr>
						<tr>
							<td style={{ visibility: "hidden" }}>invisible text</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Robot DCs</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_robot_dc.true)}</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Robot no shows</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_robot_noshow.true)}</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Robot stranded on game piece</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_robot_strand.true)}</td>
						</tr>
						<tr>
							<td className="analyticsTable" />
							<td className="analyticsTable">Robot dropped a lot of pieces</td>
							<td className="analyticsTable">{this.validInt(this.props.data.tot_robot_drop.true)}</td>
						</tr>
					</tbody>
				</table>
				<br />
				<h3>Peanut gallery comment box</h3>
				<table className="commentTable">
					<tbody>{otherComments}</tbody>
				</table>
			</div>
		);
	}
}
