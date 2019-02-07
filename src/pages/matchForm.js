import React, { Component } from 'react';

class MatchForm extends Component {
    render() {
        return (
            <div>
                <p>Form for match {this.props.match.params.matchId} here</p>
            </div>
        );
    }
}

export default MatchForm;
