import React, { Component } from 'react';

class Team extends Component {
    render() {
        return (
            <div>
                <p>Requested team: {this.props.match.params.teamNum}</p>
            </div>
        );
    }
}

export default Team;
