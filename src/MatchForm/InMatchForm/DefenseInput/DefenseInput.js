import React, {Component} from 'react';
import Modal from "react-responsive-modal";


class DefenseInput extends Component {
  getJSON() {
      return {defType:this.defType, duration:(this.endTime - this.startTime)/1000};
  }

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.startTime = 0;
    this.endTime = 0;
    this.defType = '';

    this.getJSON = this.getJSON.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.setDefType = this.setDefType.bind(this);
  }

  onOpenModal = () => {
    this.setState({ open: true });
    this.startTime = new Date().getTime();
  };

  onCloseModal = () => {
    this.setState({ open: false });
    this.endTime = new Date().getTime();
  };

  setDefType = (type) => {
    this.defType = type;
  }

    render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal}>Defense</button>
        <Modal open={open} onClose={this.onCloseModal} center>
        <br/>
        <button style={{margin:5}} onClick={()=>{this.setDefType('rocket_goalkeep')}}> Rocket Goalkeep </button><br/>
        <button style={{margin:5}} onClick={()=>{this.setDefType('ship_goalkeep')}}> Ship Goalkeep </button><br/>
        <button style={{margin:5}} onClick={()=>{this.setDefType('pinning')}}> Pinning </button><br/>
        <button style={{margin:5}} onClick={()=>{this.setDefType('driving_around')}}> Driving Around </button><br/>
        <button style={{margin:5}} onClick={()=>{this.setDefType('tough_defense')}}> Tough Defense </button><br/>
        </Modal>
      </div>
    );
  }
}

export default DefenseInput;
