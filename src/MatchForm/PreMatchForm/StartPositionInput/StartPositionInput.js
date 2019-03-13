import React, { Component, Fragment } from 'react';

export default class StartPositionInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.loadData ? this.props.data.start_on_lvl_2 : "false"
		};
		this.getJSON = this.getJSON.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	getJSON() {
		return { "start_on_lvl_2": this.state.value };
	}

	handleChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	render() {
		return (
			<Fragment>
				<p className="nonSelectable" style={{visibility:'hidden'}}>Hidden text</p>
				<p className="subheader"> Select Start Position  </p>
				<label className="comment">
					<input checked={this.state.value === "false"} type="radio" name="startPos" value="false" onChange={this.handleChange}></input>
					Level 1
            	</label><br />
				<label className="comment">
					<input checked={this.state.value === "true"} type="radio" name="startPos" value="true" onChange={this.handleChange}></input>
					Level 2
            	</label><br />
			</Fragment>
		);
	}
}
