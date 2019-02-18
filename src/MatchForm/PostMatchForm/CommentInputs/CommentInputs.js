import React, { Component } from 'react';
import CommentCheckboxInput from './CommentCheckboxInput';
import CommentRadioInput from './CommentRadioInput';

class CommentInputs extends Component {
	constructor(props) {
		super(props);
		this.getJSON = this.getJSON.bind(this);

		this.radio1Ref = React.createRef();
		this.cbox1Ref = React.createRef();
		this.cbox2Ref = React.createRef();
		this.cbox3Ref = React.createRef();
		this.cmtRefs = [this.radio1Ref, this.cbox1Ref, this.cbox2Ref, this.cbox3Ref];
	}
	getJSON() {
		let obj = {};
		for (let i = 0; i < this.cmtRefs.length; i++) {
			let fieldJSON = this.cmtRefs[i].current.getJSON();
			for (let key in fieldJSON) {
				obj[key] = fieldJSON[key];
			}
		}
		return obj;
	}
	render() {
		return (
			<React.Fragment>
				<CommentRadioInput className="comments" inputId="climb_state"
					choices={
						[
							{ value: "climb_yes", description: " Robot climbed successfully." },
							{ value: "climb_no", description: " Robot fell off while trying to climb. " },
							{ value: "climb_fall", description: " Robot tipped while climbing." },
							{ value: "climb_tipper", description: " Robot tipped while climbing on another." },
							{ value: "climb_tipped", description: " Robot tipped while another climbed on them." }
						]
					}
					description="Climb Comments"
					ref={this.radio1Ref} /><br />
				<p className="subheader"> Other Comments </p>
				<CommentCheckboxInput inputId="robot_dc" description=" Robot DC'd midmatch." ref={this.cbox1Ref} /><br />
				<CommentCheckboxInput inputId="robot_noshow" description=" Robot was a no-show." ref={this.cbox2Ref} /><br />
				<CommentCheckboxInput inputId="robot_drop" description=" Robot droppped several game pieces." ref={this.cbox3Ref} />
			</React.Fragment>
		);
	}
}

export default CommentInputs;
