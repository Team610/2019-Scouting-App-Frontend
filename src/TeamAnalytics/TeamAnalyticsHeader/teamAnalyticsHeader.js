import React, { Component } from 'react';
import "../style.css";

class TeamAnalyticsHeader extends Component {
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
            <div className="stickyHeader" id="teamPageHeader">
                <h2>Team #{this.props.teamNum}</h2>
            </div>
        );
    }
}

export default TeamAnalyticsHeader;
