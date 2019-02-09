import React, { Component } from 'react';
import { RobotPreload, ShipPreload, CycleInput, ClimbSelect } from './inputs';

class MatchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    submitForm(event) {
        console.log("form submitted");
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <p>Form for match {this.props.match.params.matchId} here</p>
                <MatchFormHeader />
                <form method="post" id="form">
                    <SelectTeam matchNum={this.props.match.params.matchId} />
                    <PreMatchForm /><br/>
                    <InMatchForm /><br/>
                    <PostMatchForm /><br/>
                    <button type="submit" onClick={this.submitForm}>Submit</button>
                </form>
            </div>
        );
    }
}

class SelectTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            teamsLoaded: false,
            teamList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getTeams();
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    handleSubmit(event) {
        console.log(`team num: ${this.state.value}`);
        event.preventDefault();
    }
    async getTeams() {
        console.log("getting teams");
        let teamList = await fetch(`/matches/${this.props.matchNum}/teams`);
        let teamJSON = await teamList.json();
        let teams = [];
        for (let i=0; i<teamJSON.length; i++) {
            teams[i] = <option key={teamJSON[i]} value={teamJSON[i]}>{teamJSON[i]}</option>;
        }
        this.setState({
            teamsLoaded: true,
            teamList: teams
        })
    }
    render() {
        if(this.state.teamsLoaded) {
            console.log(this.state.teamList)
            return (
                <select value={this.state.value} onChange={this.handleChange}>
                    {this.state.teamList}
                </select>
            );
        } else {
            return (
                <p>Loading team list...</p>
            )
        }
    }
}

class MatchFormHeader extends Component {
    render() {
        return(<div>Header here</div>);
    }
}

class PreMatchForm extends Component {
    render() {
        return (
            <div>
                <RobotPreload />
                <ShipPreload />
            </div>
        );
    }
}

class InMatchForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            numCycles: 1
        };
        this.getCycles = this.getCycles.bind(this);
        this.addCycle = this.addCycle.bind(this);
    }
    getCycles() {
        let cycles = [];
        for (let i=0; i<this.state.numCycles; i++) {
            cycles.push(<CycleInput key={i+1} cycleNum={i+1} />);
        }
        return cycles;
    }
    addCycle() {
        this.setState({
            numCycles: this.state.numCycles+1
        });
    }
    render() {
        let cycles = this.getCycles();
        return(
            <div>
                {cycles}
                <button type="button" onClick={this.addCycle}>Add Cycle</button>
            </div>
        );
    }
}

class PostMatchForm extends Component {
    render() {
        return(
            <div>
                <ClimbSelect />
            </div>
        );
    }
}

export default MatchForm;
