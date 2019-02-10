import React, {Component} from 'react';
import CycleInputs from '../MatchFormInputs/cycle-inputs';

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
        this.fieldRefs.push(cyclesRef);
        return (
            <div>
                <CycleInputs ref={cyclesRef} />
            </div>
        );
    }
}

export default InMatchForm;