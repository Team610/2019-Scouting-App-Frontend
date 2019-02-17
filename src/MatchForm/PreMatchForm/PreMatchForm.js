import React, {Component} from 'react';
import RobotPreload from './RobotPreloadInput/RobotPreloadInput';
import ShipPreload from './ShipPreloadsInput/ShipPreloadsInput';
import StartPosition from './StartPositionInput/StartPositionInput';
import TeamInput from './TeamInput/TeamInput';

class PreMatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
		this.getJSON = this.getJSON.bind(this);
		
		this.teamSlctRef = React.createRef();
		this.startPosRef = React.createRef();
		this.robPrldRef = React.createRef();
		this.shpPrldRef = React.createRef();
		this.fieldRefs = [this.teamSlctRef, this.startPosRef, this.robPrldRef, this.shpPrldRef];
    }
    getJSON() {
        let obj={};
        for (let i=0; i<this.fieldRefs.length; i++) {
            let fieldJSON = this.fieldRefs[i].current.getJSON();
            for (let key in fieldJSON) {
                obj[key] = fieldJSON[key];
            }
        }
        return obj;
	}
    render() {
        return(
            <div>
                <TeamInput matchNum = {this.props.matchNum} ref={this.teamSlctRef} /><br/>
				<StartPosition ref={this.startPosRef} />
                <RobotPreload id='robot_preload' ref={this.robPrldRef} />
                <ShipPreload id='ship_preloads' ref={this.shpPrldRef} />
            </div>
        ); //TODO: figure out who has responsibility for fetching correct match# and team# from DB
    }
}

export default PreMatchForm;