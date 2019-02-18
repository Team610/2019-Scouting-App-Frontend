import React, {Component} from 'react';
import RobotPreloadInput from './RobotPreloadInput/RobotPreloadInput';
import ShipPreloadInput from './ShipPreloadsInput/ShipPreloadsInput';
import StartPositionInput from './StartPositionInput/StartPositionInput';
import TeamInput from './TeamInput/TeamInput';
import RobotPhotoDisplay from './RobotPhotoDisplay/RobotPhotoDisplay';
import "../style.css";

class PreMatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
		this.getJSON = this.getJSON.bind(this);

		this.teamSlctRef = React.createRef();
		this.startPosRef = React.createRef();
		this.robPrldRef = React.createRef();
		this.shpPrldRef = React.createRef();
    this.robPhotRef = React.createRef();
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
              <div class="element">
                <TeamInput matchNum = {this.props.matchNum} ref={this.teamSlctRef} /><br/>
                  <table>
                    <col width = "160"></col>
                    <col width = "160"></col>
                    <tbody>
                      <tr>
                        <td><RobotPreloadInput id='robot_preload' ref={this.robPrldRef} /></td>
                        <td><ShipPreloadInput id='ship_preloads' ref={this.shpPrldRef} /></td>
                      </tr>
                    </tbody>
                  </table>
                <br/>
              </div>
              <div class = "element">
                <StartPositionInput id='start_position' ref={this.startPosRef} />
              </div>
              <div class="element">
                <RobotPhotoDisplay id='robo_photo' ref={this.shpPrldRef} />
              </div>
            </div>

        ); //TODO: figure out who has responsibility for fetching correct match# and team# from DB
    }
}

export default PreMatchForm;
