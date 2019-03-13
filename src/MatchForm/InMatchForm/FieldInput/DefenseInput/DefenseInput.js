import React, { Component, Fragment } from 'react';
import Modal from "react-responsive-modal";

class DefenseInput extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false };

		this.startTime = 0;
		this.data = {};
		this.defTypes = [
			{ id: 'rocket_goalkeep', label: 'Rocket Goalkeep' },
			{ id: 'ship_goalkeep', label: 'Ship Goalkeep' },
			{ id: 'tough_defense', label: 'Tough Defense' },
			{ id: 'pinning', label: 'Pinning' },
			{ id: 'driving_around', label: 'Driving Around' }
		]
		for (let type of this.defTypes) {
			let str = `def_${type.id}`;
			this.data[str] = this.props.loadData ? this.props.data[str] : [];
		}

		this.getJSON = this.getJSON.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
	}
	getJSON() {
		return this.data;
	}

	onOpenModal = () => {
		console.log('recording defense start');
		this.startTime = new Date().getTime();
		this.setState({ open: true });
	};
	onCloseModal = (defType) => {
		console.log(`recording defense end\ttype: ${defType}`);
		if (typeof defType === 'string') {
			this.data[`def_${defType}`].push((new Date().getTime() - this.startTime) / 1000);
		}
		this.setState({ open: false });
	};

	render() {
		let btnStyle = {
			margin: 5,
			width: 100,
			height: 50
		}
		let btnArr = [];
		for (let type of this.defTypes) {
			btnArr.push(
				<Fragment key={type.id}>
					<button
						style={btnStyle}
						onClick={() => { this.onCloseModal(type.id) }}>
						{type.label}
					</button><br />
				</Fragment>
			);
		}
		return (
			<Fragment>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
					<br />
					{btnArr}
				</Modal>
			</Fragment>
		);
	}
}

export default DefenseInput;
