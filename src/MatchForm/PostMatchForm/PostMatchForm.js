import React, { Component } from 'react';
import CommentInputs from './CommentInputs/CommentInputs';
import CommentTextbox from './CommentTextbox/CommentTextbox';

class PostMatchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getJSON = this.getJSON.bind(this);

		this.cmtInputsRef = React.createRef();
		this.cmtTxtboxRef = React.createRef();
		this.fieldRefs = [this.cmtInputsRef, this.cmtTxtboxRef];
	}
	getJSON() {
		let obj = {};
		for (let i = 0; i < this.fieldRefs.length; i++) {
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
				<CommentInputs ref={this.cmtInputsRef} />
				<CommentTextbox ref={this.cmtTxtboxRef} />
				<button onClick={this.props.callNext} className='increment-button' style={{backgroundColor: '#88ff88'}}>Submit</button>
			</React.Fragment>
		);
	}
}

export default PostMatchForm;
