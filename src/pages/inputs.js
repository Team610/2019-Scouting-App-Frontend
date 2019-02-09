import React, { Component } from 'react';

class RobotPreload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargoValue: 1,
            hatchValue: 0
        }
        this.handleCargoChange = this.handleCargoChange.bind(this);
        this.handleHatchChange = this.handleHatchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCargoChange(event) {
        this.setState({cargoValue: event.target.value});
    }
    handleHatchChange(event) {
        this.setState({hatchValue: event.target.value});
    }
    handleSubmit(event) {
        console.log(`Cargo: ${this.state.cargoValue}, Hatch: ${this.state.hatchValue}`);
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <p>Robot preload</p>
                Cargo: <input type="number" value={this.state.cargoValue} onChange={this.handleCargoChange} name="robot_preload_cargo" max="1" min="0" /><br />
                Hatch: <input type="number" value={this.state.hatchValue} onChange={this.handleHatchChange} name="robot_preload_hatch" max="1" min="0" /><br />
            </div>
        );
    }
}

class ShipPreload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargoValue: 2,
            hatchValue: 0
        }
        this.handleCargoChange = this.handleCargoChange.bind(this);
        this.handleHatchChange = this.handleHatchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCargoChange(event) {
        this.setState({cargoValue: event.target.value});
    }
    handleHatchChange(event) {
        this.setState({hatchValue: event.target.value});
    }
    handleSubmit(event) {
        console.log(`Cargo: ${this.state.cargoValue}, Hatch: ${this.state.hatchValue}`);
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <p>Ship preloads</p>
                Cargo: <input type="number" value={this.state.cargoValue} onChange={this.handleCargoChange} name="ship_preload_cargo" max="2" min="0" /><br />
                Hatch: <input type="number" value={this.state.hatchValue} onChange={this.handleHatchChange} name="ship_preload_hatch" max="2" min="0" /><br />
            </div>
        );
    }
}

class CycleInput extends Component {
    constructor(props){
        super(props);
        this.state={
            active: false,
            startTime: null,
            endTime: null,
            duration: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeActiveState = this.changeActiveState.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    changeActiveState() {
        if(this.state.active) {
            let end = new Date().getTime();
            this.setState({
                endTime: end,
                duration: end - this.state.startTime,
                active: !this.state.active
            });
        } else {
            this.setState({
                startTime: new Date().getTime(),
                active: !this.state.active
            });
        }
    }
    handleSubmit(event) {
        console.log(`Cycle number: ${this.state.cycleNum}, Cycle duration: ${this.state.duration}`);
        event.preventDefault();
    }
    handleChange(event) {
        this.setState({
            duration: event.target.value
        });
    }
    render() {
        return(
            <div>
            Cycle {this.props.cycleNum}: { this.state.duration/1000+'\t' }
            <button type="button" onClick={ this.changeActiveState }>
                { !this.state.active ? 'start' : 'end'}
            </button>
            <input type="number" id={`cycle_${this.props.cycleNum}`} name={`cycle_${this.props.cycleNum}`} value={this.state.duration} onChange={this.handleChange} hidden />
            </div>
        );
    }
}

class ClimbSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'Lv0'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }
    handleSubmit(event) {
        console.log(`Climb level: ${this.state.value}`);
        event.preventDefault();
    }
    render() {
        return(
            <div>
                Climb level: <br/>
                <select value={this.state.value} name="robot_climb" onChange={this.handleChange}>
                    <option value="Lv3">Level 3</option>
                    <option value="Lv2">Level 2</option>
                    <option value="Lv1">Level 1</option>
                    <option value="Lv0">Did not climb</option>
                </select>
            </div>
        );
    }
}

export { RobotPreload };
export { ShipPreload };
export { CycleInput };
export { ClimbSelect };
