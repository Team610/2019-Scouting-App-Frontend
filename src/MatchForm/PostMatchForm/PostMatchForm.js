import React, { Component } from 'react';
import CommentInputs from './CommentInputs/CommentInputs';
import CommentTextbox from './CommentTextbox/CommentTextbox';
import SubmitError from '../SubmitError';

class PostMatchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.getJSON = this.getJSON.bind(this);
		this.callNext = this.callNext.bind(this);

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
				<button id='submit-btn' onClick={this.callNext} className='increment-button' style={{backgroundColor: '#88ff88'}}>Submit</button>
			</React.Fragment>
		);
	}
	async callNext() {
		let submitBtn = document.getElementById('submit-btn');
		try {
			submitBtn.disabled = true;
			submitBtn.style.cssText = "background-color: #55cc55; color: #555";
			submitBtn.innerHTML = "Submitting...";
			await this.props.callNext();
		} catch (err) {
			if(err instanceof SubmitError) {
				submitBtn.disabled = false;
				submitBtn.style.cssText = "background-color: #88ff88";
				submitBtn.innerHTML = "Submit";
				alert(err.message);
			} else {
				throw err;
			}
		}
	}
}

export default PostMatchForm;
