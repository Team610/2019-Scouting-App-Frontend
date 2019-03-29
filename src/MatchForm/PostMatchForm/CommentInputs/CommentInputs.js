import React, { Component, Fragment } from 'react';
import CommentCheckboxInput from './CommentCheckboxInput';
import CommentRadioInput from './CommentRadioInput';

export default class CommentInputs extends Component {
	constructor(props) {
		super(props);
		this.getJSON = this.getJSON.bind(this);

		this.climbRadioRef = React.createRef();
		this.dcCboxRef = React.createRef();
		this.noshowCboxRef = React.createRef();
		this.strandCboxRef = React.createRef();
		this.dropCboxRef = React.createRef();
		this.cmtRefs = [this.climbRadioRef, this.dcCboxRef, this.noshowCboxRef, this.strandCboxRef, this.dropCboxRef];
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
			<Fragment>
				<CommentRadioInput className="comments" inputId="climb_state"
					choices={
						[
							{ value: "climb_yes", description: " Robot climbed successfully." },
							{ value: "climb_no_attempt", description: " Robot did not attempt to climb. "},
							{ value: "climb_no", description: " Robot tried to climb for a higher level but fell off. " },
							{ value: "climb_fall", description: " Robot tipped while climbing." },
							{ value: "climb_tipper", description: " Robot tipped while climbing on another." },
							{ value: "climb_tipped", description: " Robot tipped while another climbed on them." }
						]
					}
					description="Climb Comments"
					ref={this.climbRadioRef}
					data={this.props.data}
					loadData={this.props.loadData} />
				<p className="subheader"> Other Comments </p>
				<CommentCheckboxInput
					inputId="robot_dc"
					description=" Robot DC'd midmatch."
					ref={this.dcCboxRef}
					data={this.props.data}
					loadData={this.props.loadData} />
				<CommentCheckboxInput
					inputId="robot_noshow"
					description=" Robot was a no-show."
					ref={this.noshowCboxRef}
					data={this.props.data}
					loadData={this.props.loadData} />
				<CommentCheckboxInput
					inputId="robot_strand"
					description=" Robot was stranded on a game piece."
					ref={this.strandCboxRef}
					data={this.props.data}
					loadData={this.props.loadData} />
				<CommentCheckboxInput
					inputId="robot_drop"
					description=" Robot dropped several game pieces."
					ref={this.dropCboxRef}
					data={this.props.data}
					loadData={this.props.loadData} />
			</Fragment>
		);
	}
}
