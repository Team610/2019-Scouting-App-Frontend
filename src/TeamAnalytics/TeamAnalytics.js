import React, { Component, Fragment } from 'react';
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
			teamNum: -1,
			dataAvailable: false,
			teamListAvailable: false,
			status: 'Team list loading...' //TODO: separate status codes and messages
		}
		this.setTeamNum = this.setTeamNum.bind(this);
		this.getTeamList = this.getTeamList.bind(this);
		this.collectedData = {};
	}
	async componentDidMount() {
		this._isMounted = true;
		this.teamList = await this.getTeamList();
		if (this._isMounted)
			this.setState({ status: 'Which team?' });
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	async setTeamNum(num) {
		if (num === this.state.teamNum) {
			return;
		}
		if (this.collectedData[num] === undefined) {
			//If this team's data hasn't been collected yet...
			if (this._isMounted) {
				this.setState({ teamNum: num, status: `Team ${num} data loading...` });
			} else {
				return;
			}
			let res = await fetch(`/api/v1/stats/team/${num}/agg`);
			if (!res.ok) {
				if (this._isMounted)
					this.setState({ status: new Error("Could not fetch team data. Please try again.") });
				return;
			}
			res = await res.json();
			this.data = res[num];
			console.log(`Fetched team ${num}`);
			if (this._isMounted) {
				this.collectedData[num] = this.data;
				this.setState({ teamNum: num, status: 'ok' });
			}
		} else {
			if (this._isMounted) {
				console.log(`Team ${num} has been pulled before`);
				this.data = this.collectedData[num];
				this.setState({ teamNum: num });
			} else {
				return;
			}
		}
	}
	async getTeamList() {
		let res = await fetch(`/api/v1/event/getEventTeams`);
		if (!res.ok) {
			if (this._isMounted)
				this.setState({ status: new Error("Could not fetch team list. Please try again.") });
			return;
		}
		res = await res.json();
		return res;
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
					{this.state.status !== 'Team list loading...' &&
						<TeamSelect
							teamList={this.teamList}
							setTeamNum={this.setTeamNum}
							teamNum={this.state.teamNum} />}
					<TeamAnalyticsHeader
						teamNum={this.state.teamNum}
						text={this.state.status !== 'ok' && this.state.status} />
					<Accordion>
						{this.data ? <OverallSection label="Overall" teamNum={this.state.teamNum} data={this.data} /> : null}
						{this.data ? <PhotoSection label="Photos" teamNum={this.state.teamNum} /> : null}
						{this.data ? <CyclesSection label="Cycles" teamNum={this.state.teamNum} data={this.data} /> : null}
						{this.data ? <PreGameSection label="Preloads" teamNum={this.state.teamNum} data={this.data} /> : null}
						{this.data ? <EndGameSection label="Climbs" teamNum={this.state.teamNum} data={this.data} /> : null}
						{this.data ? <DefenseSection label="Defense" teamNum={this.state.teamNum} data={this.data} /> : null}
						{this.data ? <CommentsSection label="Comments" teamNum={this.state.teamNum} data={this.data} /> : null}
					</Accordion>
				</div>
			);
		}
	}
}

class TeamSelect extends Component {
	render() {
		let json = this.props.teamList;
		let liList = [];
		let btnClass = 'btn-link';
		for (let i = 0; i < json.length; i++) {
			liList.push(
				<li key={json[i]}>
					<button
						onClick={() => { this.props.setTeamNum(json[i]); }}
						className={`${btnClass} ${json[i] === this.props.teamNum ? 'active' : ''}`}
						href='#'>{json[i]}</button>
				</li>
			);
		}
		return (
			<Fragment>
				<h2>Teams</h2>
				<ul>{liList}</ul>
			</Fragment>
		);
	}
}
