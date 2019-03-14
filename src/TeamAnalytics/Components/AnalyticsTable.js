import React, { Component } from 'react';
import {isEqual} from './Util';

export default class AnalyticsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headers: this.populateHeaders(),
			rows: this.populateRows()
		};
		this.populateHeaders = this.populateHeaders.bind(this);
		this.populateRows = this.populateRows.bind(this);
	}
	populateHeaders() {
		let headers = [];
		for (let header of this.props.headers) {
			headers.push(<th key={header}>{header}</th>);
		}
		return headers;
	}
	populateRows() {
		let rows = [];
		for (let i = 0; i < this.props.rows.length; i++) {
			const row = this.props.rows[i];
			let cells = [];
			for (let j=0; j<row.length; j++) {
				cells.push(<td className="analyticsTable" key={''+i+j}>{row[j]}</td>);
			}
			rows.push(<tr key={i}>{cells}</tr>);
		}
		return rows;
	}
	componentDidUpdate(prevProps) {
		if (!isEqual(this.props.headers, prevProps.headers)) {
			this.setState({ headers: this.populateHeaders() });
		}
		if (!isEqual(this.props.rows, prevProps.rows)) {
			this.setState({ rows: this.populateRows() });
		}
	}
	
	render() {
		return (
			<table className="analyticsTable">
				<thead>
					<tr>
						{this.state.headers}
					</tr>
				</thead>
				<tbody>
					{this.state.rows}
				</tbody>
			</table>
		);
	}
}
