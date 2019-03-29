import React, { Component } from "react";
import { validFlt, validInt } from '../Components/Util';
import ATable from '../Components/AnalyticsTable';

export default class OverallSection extends Component {
	constructor(props) {
		super(props);
		this.populateHeaders = this.populateHeaders.bind(this);
		this.populateRows = this.populateRows.bind(this);
		this.state = {
			headers: this.populateHeaders(),
			rows: this.populateRows()
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.data !== this.props.data && this._isMounted)
			this.setState({ rows: this.populateRows() });
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	populateRows() {
		const avg_num_hatch = validFlt(this.props.data.avg_num_ss_hatch_tot + this.props.data.avg_num_to_hatch_tot);
		const avg_time_hatch = validFlt(this.props.data.avg_time_ss_hatch_tot * this.props.data.avg_num_ss_hatch_tot / avg_num_hatch + this.props.data.avg_time_to_hatch_tot * this.props.data.avg_num_to_hatch_tot / avg_num_hatch);
		const avg_num_cargo = validFlt(this.props.data.avg_num_ss_cargo_tot + this.props.data.avg_num_to_cargo_tot);
		const avg_time_cargo = validFlt(this.props.data.avg_time_ss_cargo_tot * this.props.data.avg_num_ss_cargo_tot / avg_num_cargo + this.props.data.avg_time_to_cargo_tot * this.props.data.avg_num_to_cargo_tot / avg_num_cargo);
		const avg_num_cycle = validFlt(Number(avg_num_hatch) + Number(avg_num_cargo));
		const avg_time_cycle = validFlt((avg_num_hatch * avg_time_hatch + avg_num_cargo * avg_time_cargo) / (avg_num_cycle));
		const lvl2_climbs = validInt(this.props.data.tot_num_climb_lvl[2]);
		const lvl3_climbs = validInt(this.props.data.tot_num_climb_lvl[3]);
		const tot_climbs = validInt(lvl2_climbs + lvl3_climbs);
		const avg_time_climb = validFlt(this.props.data.avg_time_climb_lv2 * lvl2_climbs / tot_climbs + this.props.data.avg_time_climb_lv3 * lvl3_climbs / tot_climbs);
		return [[
			`${avg_num_hatch} @ ${avg_time_hatch} s`,
			`${avg_num_cargo} @ ${avg_time_cargo} s`,
			`${avg_num_cycle} @ ${avg_time_cycle} s`,
			`${tot_climbs} @ ${avg_time_climb} s`
		]];
	}
	populateHeaders() {
		return ['Hatch', 'Cargo', 'Cycles', 'Climb'];
	}

	render() {
		return (
			<ATable
				headers={this.state.headers}
				rows={this.state.rows} />
		);
	}
}
