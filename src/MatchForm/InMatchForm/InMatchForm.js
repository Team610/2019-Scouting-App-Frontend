import React, {Component} from 'react';
// import CycleInputs from './CycleInputs/CycleInputs'; //LEGACY FIELDS
// import ClimbLevelInput from './ClimbLevelInput/ClimbLevelInput';
// import DefenseInput from './DefenseInput/DefenseInput';
import FieldInput from './FieldInput/FieldInput';

class InMatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
		this.getJSON = this.getJSON.bind(this);
		
		this.fieldInputRef = React.createRef();
		this.fieldRefs = [this.fieldInputRef];
        // let cyclesRef = React.createRef(); //LEGACY REFS
        // let defenseRef = React.createRef();
        // let climbRef = React.createRef();
		// this.fieldRefs.push(cyclesRef, defenseRef, climbRef);
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
        return (
            <div>
                <FieldInput ref={this.fieldInputRef} />
            </div>
        );
    }
}

export default InMatchForm;