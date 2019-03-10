import React, {Component} from 'react';

class TeamInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
			value: this.props.data ? this.props.data.teamNum : '',
			alliance: this.props.data ? this.props.data.alliance : '',
            teamsLoaded: false
		}
        this.selectTeam = this.selectTeam.bind(this);
        this.renderTeamBtns = this.renderTeamBtns.bind(this);
        this.getTeams = this.getTeams.bind(this);
		this.getJSON = this.getJSON.bind(this);
		this.getAlliance = this.getAlliance.bind(this);

		this.getTeams();
	}
    getJSON() {
        return ({
            teamNum: this.state.value
        });
	}
	getAlliance() {
		return this.state.alliance;
	}
	
    selectTeam(teamNum, pos) {
        this.setState({
			value: teamNum,
			alliance: pos<3?'red':'blue'
		});
    }
    async getTeams() {
        try {
            let teamListRaw = await fetch(`/api/v1/matches/${this.props.matchNum}/teams`);
			this.teamList = await teamListRaw.json();
			this.setState({
				teamsLoaded: true
			});
            this.renderTeamBtns('');
        } catch(err) {
            console.log("could not load teams");
            console.log(err.stack);
            this.setState({
                teamsLoaded: false
            });
        }
    }
    renderTeamBtns(activeTeam) {
		let teams = [];
		for (let i=0; i<this.teamList.length; i++) {
			teams[i] = (
				<button type="button"
						key = {i}
						onClick={() => {this.selectTeam(this.teamList[i], i);}}
						className={this.teamList[i]===activeTeam ? 'btn-active' : 'btn-inactive'}>
					{this.teamList[i]}
				</button>
			);
		}
		return teams;
	}
	
    render() {
        if(this.state.teamsLoaded) {
			let teamBtns = this.renderTeamBtns(this.state.value);
            return (
                <div>
                    Team num: &nbsp;
                    {teamBtns}
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
