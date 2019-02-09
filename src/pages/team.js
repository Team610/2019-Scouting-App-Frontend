import React, { Component } from 'react';
import GroupTabs from './groupTabs';

class Team extends Component {
    render() {
        return (
            <div>
                <p>Requested team: {this.props.match.params.teamNum}</p>
                <GroupTabs/>
            </div>
        );
    }
}

export default Team;
