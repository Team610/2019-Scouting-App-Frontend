import React, { Component, Fragment } from 'react';
import TeamInput from './TeamInput/TeamInput';
import RobotPreloadInput from './RobotPreloadInput/RobotPreloadInput';
import ShipPreloadInput from './ShipPreloadsInput/ShipPreloadsInput';
import StartPositionInput from './StartPositionInput/StartPositionInput';
import RobotPhotoDisplay from './RobotPhotoDisplay/RobotPhotoDisplay';

export default class PreMatchForm extends Component {
	constructor(props) {
		super(props);
		this.state = { teamNum: this.props.data.teamNum };
		this.getJSON = this.getJSON.bind(this);
		this.updateTeamNum = this.updateTeamNum.bind(this);

		this.startPosRef = React.createRef();
		this.robPrldRef = React.createRef();
		this.shpPrldRef = React.createRef();
		this.fieldRefs = [this.startPosRef, this.robPrldRef, this.shpPrldRef];

		if (this.props.isAdmin) {
			this.teamSlctRef = React.createRef();
			this.fieldRefs.push(this.teamSlctRef);
		}
	}
	getJSON() {
		let obj = {};
		for (let i = 0; i < this.fieldRefs.length; i++) {
			let fieldJSON = this.fieldRefs[i].current.getJSON();
			for (let key in fieldJSON) {
				obj[key] = fieldJSON[key];
			}
		}
		return obj;
	}
	updateTeamNum(aNum) {
		this.setState({ teamNum: aNum });
	}
	render() {
		let teamSelect = null;
		if (this.props.isAdmin) {
			teamSelect = (
				<Fragment>
					<TeamInput
						ref={this.teamSlctRef}
						data={this.props.data}
						loadData={this.props.loadData}
						updateTeamNum={this.updateTeamNum} />
					<br />
				</Fragment>
			);
		}
		let roboDisplay = <RobotPhotoDisplay teamNum={this.state.teamNum} />
		return (
			<div style={{ overflow: 'auto' }}>
				{teamSelect}
				<div className="element">
					<table>
						<colgroup>
							<col width="160"></col>
							<col width="160"></col>
						</colgroup>
						<tbody>
							<tr>
								<td>
									<RobotPreloadInput
										id='robot_preload'
										ref={this.robPrldRef}
										data={this.props.data}
										loadData={this.props.loadData} />
								</td>
								<td>
									<ShipPreloadInput
										id='ship_preloads'
										ref={this.shpPrldRef}
										data={this.props.data}
										loadData={this.props.loadData} />
								</td>
							</tr>
						</tbody>
					</table>
					<StartPositionInput id='start_position' ref={this.startPosRef} data={this.props.data} loadData={this.props.loadData} />
				</div>
				<div className="element">
					{roboDisplay}
				</div>
				<button onClick={this.props.callNext}>Start</button>
			</div>
		); //TODO: figure out who has responsibility for fetching correct match# and team# from DB
	}
}
