import React, {Component} from 'react';

class MatchFormHeader extends Component {
    render() {
        return(
            <React.Fragment>
                <p><strong>Match #{this.props.matchNum}</strong></p>
            </React.Fragment>
        );
    }
}

export default MatchFormHeader;
