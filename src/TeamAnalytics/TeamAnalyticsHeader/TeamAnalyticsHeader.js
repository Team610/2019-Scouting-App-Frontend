import React, { Component } from 'react';

class TeamAnalyticsHeader extends Component {
    render() {
        return (
            <div className="sticky teamPageHeader" id="teamPageHeader">
                <h2>Team #{this.props.teamNum}</h2>
            </div>
        );
    }
}

export default TeamAnalyticsHeader;
