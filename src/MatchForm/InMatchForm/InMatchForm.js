import React, {Component} from 'react';
import FieldInput from './FieldInput/FieldInput';

class InMatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
		this.getJSON = this.getJSON.bind(this);
		
		this.fieldInputRef = React.createRef();
		this.fieldRefs = [this.fieldInputRef];
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
            <React.Fragment>
                <FieldInput callNext={this.props.callNext} robotPreload={this.props.robotPreload} ref={this.fieldInputRef} />
            </React.Fragment>
        );
    }
}

export default InMatchForm;