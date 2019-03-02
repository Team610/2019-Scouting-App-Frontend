import React, { Component } from 'react';
import Modal from "react-responsive-modal";

class DefenseInput extends Component {
	getJSON() {
		return this.data;
	}

	constructor(props) {
		super(props);
		this.state = { open: false };

		this.startTime = 0;
		this.data = {'def_tough_defense':[], 'def_rocket_goalkeep':[], 'def_ship_goalkeep':[], 'def_pinning':[], 'def_driving_around':[]};

		this.getJSON = this.getJSON.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
	}

	onOpenModal = () => {
		console.log('recording defense start');
		this.startTime = new Date().getTime();
		this.setState({ open: true });
	};

	onCloseModal = (defType) => {
		console.log(`recording defense end\ttype: ${defType}`);
		if (typeof defType === 'string') {
			this.data[`def_${defType}`].push((new Date().getTime()-this.startTime)/1000);
		}
		this.setState({ open: false });
	};

	render() {
		return (
			<React.Fragment>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
					<br />
					<button style={{ margin: 5,width:100,height:50 }}
							onClick={() => { this.onCloseModal('rocket_goalkeep') }}>
						Rocket Goalkeep
					</button><br />
					<button style={{ margin: 5,width:100,height:50 }}
							onClick={() => { this.onCloseModal('ship_goalkeep') }}>
						Ship Goalkeep
					</button><br />
					<button style={{ margin: 5,width:100,height:50 }}
							onClick={() => { this.onCloseModal('pinning') }}>
						Pinning
					</button><br />
					<button style={{ margin: 5,width:100,height:50 }}
							onClick={() => { this.onCloseModal('driving_around') }}>
						Driving Around
					</button><br />
					<button style={{ margin: 5,width:100,height:50 }}
							onClick={() => { this.onCloseModal('tough_defense') }}>
						Tough Defense
					</button><br />
				</Modal>
			</React.Fragment>
		);
	}
}

export default DefenseInput;
