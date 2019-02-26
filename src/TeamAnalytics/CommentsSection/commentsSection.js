import React, {Component} from 'react';

class CommentsSection extends Component {
	showMatchData() {
		console.log("showing comment match data");
	}
	render() {
		return (
			<div>
				<h1 className="comp">
					<table className="header">
						<thead>
							<tr>
								<th className="name">Comments</th>
							</tr>
						</thead>
					</table>
				</h1>
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
							<td className="analyticsTable"/>
							<td className="analyticsTable">Failed climbs</td>
							<td className="analyticsTable">{this.props.data.tot_climb_states.climb_no?this.props.data.tot_climb_states.climb_no:0}</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Tipped climbs</td>
							<td className="analyticsTable">{this.props.data.tot_climb_states.climb_fall?this.props.data.tot_climb_states.climb_fall:0}</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Tipped another robot while climbing</td>
							<td className="analyticsTable">{this.props.data.tot_climb_states.climb_tipper?this.props.data.tot_climb_states.climb_tipper:0}</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Got tipped by another robot while climbing</td>
							<td className="analyticsTable">{this.props.data.tot_climb_states.climb_tipped?this.props.data.tot_climb_states.climb_tipped:0}</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Robot DCs</td>
							<td className="analyticsTable">{this.props.data.tot_robot_dc.true?this.props.data.tot_robot_dc.true:0}</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Robot no shows</td>
							<td className="analyticsTable">{this.props.data.tot_robot_noshow.true?this.props.data.tot_robot_noshow.true:0}</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Robot dropped a lot of pieces</td>
							<td className="analyticsTable">{this.props.data.tot_robot_drop.true?this.props.data.tot_robot_drop.true:0}</td>
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
}

export default CommentsSection;
