import React, { Component } from 'react';

class MatchForm extends Component {
    render() {
        return (
            <div>
                <p>Form for match {this.props.match.params.matchId} here</p>
                <CycleTimer />
            </div>
        );
    }
}

class CycleTimer extends Component {
	constructor(props) {
		super(props);
		this.state = {
            takingDuration: false,
            timeStampStart: 0,
            timeStampEnd: 0,
            timeStamps: []
        };
		// This binding is necessary to make `this` work in the callback
		this.makeTimeStamp = this.makeTimeStamp.bind(this);
    }
    makeTimeStamp() {
        let time = new Date().getTime();
        if(this.state.takingDuration === true) {
            this.setState({
                takingDuration: false,
                timeStampEnd: time
            });
            this.state.timeStamps.push("   " + (time - this.state.timeStampStart) + "   ");
        } else {
            this.setState({
                takingDuration: true, 
                timeStampStart: time
            });
        }
    }
	render() {
    	return (
			<div>
                <h3>Durations:</h3>
                <h3>{this.state.timeStamps}</h3>
				<button onClick={this.makeTimeStamp} id="timeStampButton">{this.state.takingDuration ? "End" : "Start"}</button>
			</div>
		)
	}
}

export default MatchForm;
