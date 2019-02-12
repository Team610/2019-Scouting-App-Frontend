import React from 'react';

class TestForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = [];
    }

    handleSubmit(event) {
        let someString = '';
        for(let i=0; i<this.input.length; i++) {
            someString+=`field ${i}: `+JSON.stringify(this.input[i].current.getJSON())+`\n`;
        }
        console.log(someString);
        event.preventDefault();
    }

    render() {
        let ref = React.createRef();
        let ref2 = React.createRef();
        this.input.push(ref, ref2);
        return (
            <form onSubmit={this.handleSubmit}>
                <TestNumberButtons id="testnumbtns" ref={ref} /><br/>
                <TestInput id="testfield" ref={ref2} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

class TestInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:''};
        this.handleChange = this.handleChange.bind(this);
        this.getJSON = this.getJSON.bind(this);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    getJSON() {
        return ({
            [this.props.id] : this.state.value
        });
    }
    render() {
        return (
            <label>Test Field 1: <input onChange={this.handleChange} value={this.state.value} type="text" /></label>
        );
    }
}

class TestNumberButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cargo:2,hatch:0};
        this.handleChange = this.handleChange.bind(this);
        this.getJSON = this.getJSON.bind(this);
        this.cargoIncrement = this.cargoIncrement.bind(this);
        this.hatchIncrement = this.hatchIncrement.bind(this);
    }
    getJSON() {
        return ({
            [this.props.id]: [{cargo: this.state.cargo}, {hatch: this.state.hatch}]
        });
    }
    handleChange(event) {
        this.setState({
            cargo: event.target.value
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
                    <button type="button" onClick={this.cargoIncrement}>Cargo</button>
                    <input onChange={this.handleChange} value={this.state.cargo} type="number" readOnly />
                </label><br/>
                <label>
                    <button type="button" onClick={this.hatchIncrement}>Hatch</button>
                    <input onChange={this.handleChange} value={this.state.hatch} type="number" readOnly />
                </label>
            </div>
        );
    }
}

export default TestForm;
