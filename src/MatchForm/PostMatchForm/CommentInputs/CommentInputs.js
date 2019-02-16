import React, {Component} from 'react';
import CommentInput from './CommentInput';

class CommentInputs extends Component {
    getJSON() {
        return {"comments":'n/a'};
    }
    render() {
        return(<p>Comment inputs here</p>);
    }
}

export default CommentInputs;