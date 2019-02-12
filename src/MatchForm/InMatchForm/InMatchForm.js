import React, {Component} from 'react';
import CycleInputs from './CycleInputs/CycleInputs';
import ClimbLevelInput from './ClimbLevelInput/ClimbLevelInput';
import DefenseInput from './DefenseInput/DefenseInput';

class InMatchForm extends Component {
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
        let cyclesRef = React.createRef();
        let defenseRef = React.createRef();
        let climbRef = React.createRef();
        this.fieldRefs.push(cyclesRef, defenseRef, climbRef);
        return (
            <div>
                <CycleInputs ref={cyclesRef} />
                <DefenseInput ref={defenseRef} />
                <ClimbLevelInput id="climb_lvl" ref={climbRef} />
            </div>
        ); //TODO: make the id less sketchy
    }
}

export default InMatchForm;