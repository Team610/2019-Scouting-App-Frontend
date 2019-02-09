import React, { Component } from 'react';

class MatchForm extends Component {
    render() {
        return (
            <div>
                <p>Form for match {this.props.match.params.matchId} here</p>
                <ShipPreloadButtons />
                <RoboPreloadButtons />
            </div>
        );
    }
}

class ShipPreloadButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hCount: 0,
			cCount: 2
		};
		// This binding is necessary to make `this` work in the callback
		this.hClick = this.hClick.bind(this);
		this.cClick = this.cClick.bind(this);
	}
	hClick() {
		if(this.state.hCount === 0) {
			this.setState({hCount: 1, cCount: 1});
		} else if(this.state.hCount === 1) {
			this.setState({hCount: 2, cCount: 0});
		}
	}
	cClick() {
		if(this.state.cCount === 0) {
			this.setState({hCount: 1, cCount: 1});
		} else if(this.state.cCount === 1) {
			this.setState({hCount: 0, cCount: 2});
		}
	}
	render() {
    	return (
			<div>
                <h3>Ship Preloads:</h3>
				<button onClick={this.hClick} id="hButton">H: {this.state.hCount}</button>
				<button onClick={this.cClick} id="cButton">C: {this.state.cCount}</button>
			</div>
		)
	}
}

class RoboPreloadButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hCount: 0,
			cCount: 1
		};
		// This binding is necessary to make `this` work in the callback
		this.hClick = this.hClick.bind(this);
		this.cClick = this.cClick.bind(this);
	}
	hClick() {
		this.setState({hCount: 1, cCount: 0});
	}
	cClick() {
		this.setState({hCount: 0, cCount: 1});
	}
	render() {
    	return (
			<div>
				<h3>Robot Preload:</h3>
				<button onClick={this.hClick} id="hButton">H: {this.state.hCount}</button>
				<button onClick={this.cClick} id="cButton">C: {this.state.cCount}</button>
			</div>
		)
	}
}

export default MatchForm;
