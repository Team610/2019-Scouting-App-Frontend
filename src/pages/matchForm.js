import React, { Component } from 'react';
import CoolPie from './coolPie';

class MatchForm extends Component {
    render() {
        return (
            <div>
                <p>Form for match {this.props.match.params.matchId} here</p>
                <CoolPie/>
            </div>
        );
    }
}

export default MatchForm;
