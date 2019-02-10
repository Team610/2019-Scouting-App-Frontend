import React, {Component} from 'react';

class CycleInput extends Component {
    constructor(props){
        super(props);
        this.state={
            active: false,
            startTime: null,
            endTime: null,
            duration: 0
        };
        this.changeActiveState = this.changeActiveState.bind(this);
        this.getJSON = this.getJSON.bind(this);
    }
    changeActiveState() {
        if(this.state.active) {
            let end = new Date().getTime();
            this.setState({
                endTime: end,
                duration: (end - this.state.startTime)/1000,
                active: !this.state.active
            });
            let button = document.getElementById(`cycle_${this.props.cycleNum}`);
            button.disabled = true;
        } else {
            this.setState({
                startTime: new Date().getTime(),
                active: !this.state.active
            });
        }
    }
    getJSON() {
        return ({
            cycleNum: this.props.cycleNum,
            cycleDuration: this.state.duration
        });
    }
    render() {
        return(
            <div>
                Cycle {this.props.cycleNum}: { this.state.duration+'\t' }
                <button type="button" onClick={ this.changeActiveState } id={`cycle_${this.props.cycleNum}`}>
                    { !this.state.active ? 'start' : 'end'}
                </button>
            </div>
        );
    }
}

export default CycleInput;