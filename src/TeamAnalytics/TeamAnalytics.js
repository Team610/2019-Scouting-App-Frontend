import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/TeamAnalyticsHeader';
import OverallSection from './OverallSection/OverallSection';
import CyclesSection from './CyclesSection/CyclesSection';
import PreGameSection from './PreGameSection/PreGameSection';
import EndGameSection from './EndGameSection/EndGameSection';
import DefenseSection from './DefenseSection/DefenseSection';
import CommentsSection from './CommentsSection/CommentsSection';
import PhotoSection from './PhotoSection/PhotoSection';
import Accordion from './CollapsibleContainer/Accordion';
import './style.css';

export default class TeamAnalytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'Data loading...' //TODO: separate status codes and messages
		}
		this.fetchData = this.fetchData.bind(this);
	}
	async componentDidMount() {
		this._isMounted = true;
		this.fetchData();
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	async fetchData() {
		let res = await fetch(`/api/v1/stats/team/${this.props.teamNum}/agg`);
		if (!res.ok) {
			if (this._isMounted)
				this.setState({ status: new Error("Could not fetch team data. Please try again.") });
			return;
		}
		res = await res.json();
		console.log(`Fetched team ${this.props.teamNum}`);
		this.data = res[this.props.teamNum];
		if (this._isMounted)
			this.setState({ status: 'ok' });
	}
	
	render() {
		if (this.state.status instanceof Error) {
			console.log(this.state.err.stack);
			return (
				<div>
					<p>Could not load data.</p>
					<p>{this.state.err.message}</p>
				</div>
			);
		} else {
			return ( //TODO: find a more consistent method of showing the status
				<div>
					<TeamAnalyticsHeader
						teamNum={this.props.teamNum}
						text={this.state.status !== 'ok' && this.state.status} />
					<Accordion sections={this.props.sections} changeSections={this.props.changeSections}>
						{this.data ? <OverallSection label="Overall" teamNum={this.props.teamNum} data={this.data} /> : null}
						{this.data ? <PhotoSection label="Photos" teamNum={this.props.teamNum} /> : null}
						{this.data ? <CyclesSection label="Cycles" teamNum={this.props.teamNum} data={this.data} /> : null}
						{this.data ? <PreGameSection label="Pregame" teamNum={this.props.teamNum} data={this.data} /> : null}
						{this.data ? <EndGameSection label="Climbs" teamNum={this.props.teamNum} data={this.data} /> : null}
						{this.data ? <DefenseSection label="Defense" teamNum={this.props.teamNum} data={this.data} /> : null}
						{this.data ? <CommentsSection label="Comments" teamNum={this.props.teamNum} data={this.data} /> : null}
					</Accordion>
				</div>
			); //TODO: find a way to persist chart data and share across diff sections
		}
	}
}
