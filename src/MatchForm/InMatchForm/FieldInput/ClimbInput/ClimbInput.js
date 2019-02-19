import React, {Component} from 'react';
import Modal from "react-responsive-modal";

class ClimbInput extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false };

		this.startTime = 0;
		this.data = {climb_lvl:'',climb_time:0};

		this.getJSON = this.getJSON.bind(this);
		this.onOpenModal = this.onOpenModal.bind(this);
		this.onCloseModal = this.onCloseModal.bind(this);
	}

	getJSON() {
		return this.data;
	}

	onOpenModal = () => {
		console.log('recording climb start');
		this.startTime = new Date().getTime();
		this.setState({ open: true });
	};

	onCloseModal = (climbLvl) => {
		console.log(`recording climb end\tlevel: ${climbLvl}`);
		if (typeof climbLvl === 'string') {
			this.data['climb_time']=(new Date().getTime() - this.startTime)/1000;
			this.data['climb_lvl']=`${climbLvl}`;
		}
		this.setState({ open: false });
	};

	render() {
		return(
			<React.Fragment>
				<Modal open={this.state.open} onClose={this.onCloseModal} center>
					<br/>
					<button style={{margin:5}} onClick={()=>{this.onCloseModal(3)}}>Level 3</button><br/>
					<button style={{margin:5}} onClick={()=>{this.onCloseModal(2)}}>Level 2</button><br/>
					<button style={{margin:5}} onClick={()=>{this.onCloseModal(1)}}>Level 1</button><br/>
					<button style={{margin:5}} onClick={()=>{this.onCloseModal(0)}}>Level 0</button><br/>
				</Modal>
			</React.Fragment>
		);
	}
}

export default ClimbInput;
