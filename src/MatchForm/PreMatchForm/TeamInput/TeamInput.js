import React, {Component} from 'react';

class TeamInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            teamsLoaded: false,
            teamList: []
        }
        this.selectTeam = this.selectTeam.bind(this);
        this.renderTeamBtns = this.renderTeamBtns.bind(this);
        this.getTeams = this.getTeams.bind(this);
        this.getJSON = this.getJSON.bind(this);
    }
    getJSON() {
        return ({
            teamNum: this.state.value
        });
    }
    componentDidMount() {
        this.getTeams();
    }
    selectTeam(teamNum) {
        this.setState({
            value: `${teamNum}`
        });
        this.renderTeamBtns(teamNum);
        // console.log(this.state.value)
    }
    async getTeams() {
        try {
            let teamList = await fetch(`/api/v1/matches/${this.props.matchNum}/teams`);
            let teamJSON = await teamList.json();
            this.setState({
                teamJson: teamJSON
            });
            this.renderTeamBtns('');
        } catch(err) {
            console.log("could not load teams");
            console.log(err.message);
            this.setState({
                teamsLoaded: false
            });
        }
    }
    renderTeamBtns(activeTeam) {
        try {
            let teams = [];
            for (let i=0; i<this.state.teamJson.length; i++) {
                teams[i] = <button type="button" key = {i} onClick={() => this.selectTeam(`${this.state.teamJson[i]}`)} className={this.state.teamJson[i]==activeTeam ? 'btn-active' : 'btn-inactive'}>{this.state.teamJson[i]}</button>
            }
            this.setState({
                teamsLoaded: true,
                teamList: teams
            })
        } catch (err) {
            console.log("could not load teams");
            console.log(err.message);
            this.setState({
                teamsLoaded: false
            });
        }
    }
    render() {
        if(this.state.teamsLoaded) {
            return (
                <div>
                    Team num: &nbsp;
                    {this.state.teamList}
                </div>
            );
        } else {
            return (
                <div>
                    Loading team list...
                </div>
            );
        }
    }
}

export default TeamInput;