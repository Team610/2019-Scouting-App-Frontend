import React, {Component} from 'react';

class MatchFormHeader extends Component {
    render() {
        return(
            <div>
                <p><strong>Match #{this.props.matchNum}</strong></p>
            </div>
        );
    }
}

export default MatchFormHeader;