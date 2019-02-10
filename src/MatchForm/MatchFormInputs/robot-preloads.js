import React, {Component} from 'react';
import './buttons.css';

class RobotPreload extends Component {
    constructor(props) {
        super(props);
        this.state = {cargo:1,hatch:0};
        this.getJSON = this.getJSON.bind(this);
        this.cargoIncrement = this.cargoIncrement.bind(this);
        this.hatchIncrement = this.hatchIncrement.bind(this);
    }
    getJSON() {
        return ({
            [this.props.id]: this.state.cargo ? "cargo" : "hatch"
        }); //TODO: make this less sketchy
    }
    cargoIncrement() {
        this.setState({
            cargo: this.state.cargo<1 ? this.state.cargo+1 : 1,
            hatch: this.state.hatch>0 ? this.state.hatch-1 : 0
        });
    }
    hatchIncrement() {
        this.setState({
            cargo: this.state.cargo>0 ? this.state.cargo-1 : 0,
            hatch: this.state.hatch<1 ? this.state.hatch+1 : 1
        });
    }
    render() {
        return (
            <div>
                Robot Preloads<br/>
                <label>
                    <button type="button" onClick={this.cargoIncrement} className="increment-button">Cargo: {this.state.cargo}</button>
                </label><br/>
                <label>
                    <button type="button" onClick={this.hatchIncrement} className="increment-button">Hatch: {this.state.hatch}</button>
                </label>
            </div>
        );
    }
}

export default RobotPreload;