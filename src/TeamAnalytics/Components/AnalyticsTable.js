import React, { Component } from 'react';

export default class AnalyticsTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headers: this.populateHeaders(),
			rows: this.populateRows()
		};
		this.isEqual = this.isEqual.bind(this);
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
		if (!this.isEqual(this.props.headers, prevProps.headers)) {
			this.setState({ headers: this.populateHeaders() });
		}
		if (!this.isEqual(this.props.rows, prevProps.rows)) {
			this.setState({ rows: this.populateRows() });
		}
	}
	isEqual(a, b) {
		const aObj = typeof a === 'object';
		const bObj = typeof b === 'object';
		const aArr = Array.isArray(a);
		const bArr = Array.isArray(b);
		if (aObj !== bObj || aArr !== bArr) {
			return false;
		} else if (!aObj && !bObj) {
			return a === b;
		} else if (!aArr && !bArr) {
			let aKeys = Object.keys(a);
			for (let aKey of aKeys) {
				if (b[aKey] === undefined || !this.isEqual(a[aKey], b[aKey])) {
					return false;
				}
				return true;
			}
		} else {
			let aLen = a.length;
			if (b.length !== aLen) {
				return false;
			} else {
				for (let i = 0; i < aLen; i++) {
					if (!this.isEqual(a[i], b[i])) {
						return false;
					}
				}
				return true;
			}
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
