import React, { Component } from 'react';

class TeamAnalyticsHeader extends Component {
    render() {
        return (
            <div className="sticky teamPageHeader" id="teamPageHeader">
                <h2>{this.props.teamNum > 0 ? `Team #${this.props.teamNum}` : this.props.text}</h2>
            </div>
        );
    }
}

export default TeamAnalyticsHeader;
