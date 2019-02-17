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
				<table>
					<thead>
						<tr>
							<th />
							<th>Type</th>
							<th>Frequency</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td />
							<td>Comment A</td>
							<td>{"some number value"}</td>
						</tr>
						<tr>
							<td />
							<td>Comment B</td>
							<td>{"some number value"}</td>
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
}

export default CommentsSection;
