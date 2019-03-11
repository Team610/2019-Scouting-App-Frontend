import React, {Component} from 'react';

class MatchFormHeader extends Component {
    render() {
        return(
            <React.Fragment>
                <p className="subheader">Match {this.props.matchNum} &nbsp; &nbsp;Team {this.props.teamNum}</p>
            </React.Fragment>
        );
    }
}

export default MatchFormHeader;
