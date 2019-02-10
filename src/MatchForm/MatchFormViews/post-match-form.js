import React, {Component} from 'react';
import ClimbSelect from '../MatchFormInputs/climb-select';

class PostMatchForm extends Component {
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
        let climbSlctRef = React.createRef();
        this.fieldRefs.push(climbSlctRef);
        return(
            <div>
                <ClimbSelect id="climb_lvl" ref={climbSlctRef} />
            </div>
        ); //TODO: make the id less sketchy
    }
}

export default PostMatchForm;