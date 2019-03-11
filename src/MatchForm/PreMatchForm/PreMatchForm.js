import React, { Component } from 'react';
import RobotPreloadInput from './RobotPreloadInput/RobotPreloadInput';
import ShipPreloadInput from './ShipPreloadsInput/ShipPreloadsInput';
import StartPositionInput from './StartPositionInput/StartPositionInput';
import RobotPhotoDisplay from './RobotPhotoDisplay/RobotPhotoDisplay';

export default class PreMatchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getJSON = this.getJSON.bind(this);
		
		this.startPosRef = React.createRef();
		this.robPrldRef = React.createRef();
		this.shpPrldRef = React.createRef();
		this.fieldRefs = [this.startPosRef, this.robPrldRef, this.shpPrldRef];
	}
	getJSON() {
		let obj = {};
		for (let i = 0; i < this.fieldRefs.length; i++) {
			let fieldJSON = this.fieldRefs[i].current.getJSON();
			for (let key in fieldJSON) {
				obj[key] = fieldJSON[key];
			}
		}
		obj.alliance = this.props.alliance;
		return obj;
	}
	render() {
		return (
			<div style={{ overflow: 'auto' }}>
				<div className="element">
					<table>
						<colgroup>
							<col width="160"></col>
							<col width="160"></col>
						</colgroup>
						<tbody>
							<tr>
								<td><RobotPreloadInput id='robot_preload' ref={this.robPrldRef} data={this.props.data} /></td>
								<td><ShipPreloadInput id='ship_preloads' ref={this.shpPrldRef} data={this.props.data} /></td>
							</tr>
						</tbody>
					</table>
					<StartPositionInput id='start_position' ref={this.startPosRef} data={this.props.data} />
				</div>
				<div className="element">
					<RobotPhotoDisplay id='robo_photo' />
				</div>
				<button onClick={this.props.callNext}>Start</button>
			</div>
		); //TODO: figure out who has responsibility for fetching correct match# and team# from DB
	}
}
