import React, { Component, Fragment } from 'react';
import FieldInput from './FieldInput/FieldInput';

class InMatchForm extends Component {
	constructor(props) {
		super(props);
		this.getJSON = this.getJSON.bind(this);

		this.fieldInputRef = React.createRef();
		this.fieldRefs = [this.fieldInputRef];
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
			<Fragment>
				<FieldInput
					callNext={this.props.callNext}
					blueSide={this.props.blueSide}
					robotPreload={this.props.robotPreload}
					data={this.props.data}
					ref={this.fieldInputRef} />
			</Fragment>
		);
	}
}

export default InMatchForm;