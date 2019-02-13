import React, {Component} from 'react';
import RobotPreload from './RobotPreloadInput/RobotPreloadInput';
import ShipPreload from './ShipPreloadsInput/ShipPreloadsInput';
import TeamInput from './TeamInput/TeamInput';

class PreMatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.fieldRefs = [];
        this.getJSON = this.getJSON.bind(this);
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
        let teamSlctRef = React.createRef();
        let robPrldRef = React.createRef();
        let shpPrldRef = React.createRef();
        this.fieldRefs.push(teamSlctRef, robPrldRef, shpPrldRef);
        return(
            <div>
                <TeamInput matchNum = {this.props.matchNum} ref={teamSlctRef} /><br/>
                <RobotPreload id='robot_preload' ref={robPrldRef} />
                <ShipPreload id='ship_preloads' ref={shpPrldRef} />
            </div>
        ); //TODO: figure out who has responsibility for fetching correct match# and team# from DB
    }
}

export default PreMatchForm;