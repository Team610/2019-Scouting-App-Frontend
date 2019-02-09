import React, { Component } from 'react';

class Team extends Component {
    render() {
        return (
            <div>
                <p>Requested team: {this.props.match.params.teamNum}</p>
                <TeamPageHeader num={this.props.match.params.teamNum} />
            </div>
        );
    }
}

class TeamPageHeader extends Component {
  render() {
    return (
      <div class="header sticky" id="myHeader">
        <h2>Team #{this.props.num}</h2>
      </div>
    );
  }
}

export default Team;
