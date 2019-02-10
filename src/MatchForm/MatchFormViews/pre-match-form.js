import React, {Component} from 'react';
import RobotPreload from '../MatchFormInputs/robot-preloads';
import ShipPreload from '../MatchFormInputs/ship-preloads';

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
        let robPrldRef = React.createRef();
        let shpPrldRef = React.createRef();
        this.fieldRefs.push(robPrldRef, shpPrldRef);
        return(
            <div>
                <RobotPreload id='robot_preload' ref={robPrldRef} />
                <ShipPreload id='ship_preloads' ref={shpPrldRef} />
            </div>
        );
    }
}

export default PreMatchForm;