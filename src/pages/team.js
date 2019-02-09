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
  componentDidMount() {
   window.addEventListener('scroll', this.handleScroll);
 }
 componentWillUnmount() {
   window.removeEventListener('scroll', this.handleScroll);
 }
 handleScroll = () => {
   let header = document.getElementById("teamPageHeader");
   let belowTop = header.offsetTop;
   if (window.pageYOffset > belowTop) {
     header.classList.add("sticky");
 } else {
   header.classList.remove("sticky");
   }
}

  render() {
    return (
      <div className="header" id="teamPageHeader">
        <h2>Team #{this.props.num}</h2>
      </div>
    );
  }
}

export default Team;
