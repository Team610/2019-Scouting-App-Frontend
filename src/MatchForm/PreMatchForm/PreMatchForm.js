import React, {Component} from 'react';
import RobotPreload from './RobotPreloadInput/RobotPreloadInput';
import ShipPreload from './ShipPreloadsInput/ShipPreloadsInput';
import StartPosition from './StartPositionInput/StartPositionInput';
import TeamInput from './TeamInput/TeamInput';
import styles from "../style.css";

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
                  <table>
                  <col width = "160"></col>
                  <col width = "160"></col>
                    <tbody>
                      <tr>
                        <td><RobotPreload id='robot_preload' ref={this.robPrldRef} /></td>
                        <td><ShipPreload id='ship_preloads' ref={this.shpPrldRef} /></td>
                      </tr>
                    </tbody>

                  </table>
                <br/>
            </div>
        ); //TODO: figure out who has responsibility for fetching correct match# and team# from DB
    }
}

export default PreMatchForm;
