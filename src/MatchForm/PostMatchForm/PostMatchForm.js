import React, {Component} from 'react';
import CommentInputs from './CommentInputs/CommentInputs';
import CommentTextbox from './CommentTextbox/CommentTextbox';

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
        let cmtInputsRef = React.createRef();
        let cmtTxtboxRef = React.createRef();
        this.fieldRefs.push(cmtInputsRef, cmtTxtboxRef);
        return(
            <div>
                <CommentInputs ref={cmtInputsRef} />
                <CommentTextbox ref={cmtTxtboxRef} />
            </div>
        );
    }
}

export default PostMatchForm;