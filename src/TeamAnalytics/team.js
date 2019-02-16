import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/teamAnalyticsHeader';

class Team extends Component {
    render() {
        return (
            <div>
                <p>Requested team: {this.props.match.params.teamNum}</p>
                <TeamAnalyticsHeader teamNum = {this.props.match.params.teamNum} />
            </div>
        );
    }
}

export default Team;
