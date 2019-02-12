import React, {Component} from 'react';

class ShipPreload extends Component {
    constructor(props) {
        super(props);
        this.state = {cargo:2,hatch:0};
        this.getJSON = this.getJSON.bind(this);
        this.cargoIncrement = this.cargoIncrement.bind(this);
        this.hatchIncrement = this.hatchIncrement.bind(this);
    }
    getJSON() {
        let arr = [];
        for (let i=0; i<this.state.cargo; i++) {
            arr.push("cargo");
        }
        for (let i=0; i<this.state.hatch; i++) {
            arr.push("hatch");
        }
        return ({
            [this.props.id]: arr
        });
    }
    cargoIncrement() {
        this.setState({
            cargo: this.state.cargo<2 ? this.state.cargo+1 : 2,
            hatch: this.state.hatch>0 ? this.state.hatch-1 : 0
        });
    }
    hatchIncrement() {
        this.setState({
            cargo: this.state.cargo>0 ? this.state.cargo-1 : 0,
            hatch: this.state.hatch<2 ? this.state.hatch+1 : 2
        });
    }
    render() {
        return (
            <div>
                Ship Preloads<br/>
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

export default ShipPreload;