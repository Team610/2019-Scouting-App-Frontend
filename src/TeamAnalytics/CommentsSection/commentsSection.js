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
							<th>Frequency</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Comment A</td>
							<td className="analyticsTable">{"some number value"}</td>
						</tr>
						<tr>
							<td className="analyticsTable"/>
							<td className="analyticsTable">Comment B</td>
							<td className="analyticsTable">{"some number value"}</td>
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
