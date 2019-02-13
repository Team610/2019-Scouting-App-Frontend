import React, { Component } from 'react';

class Team extends Component {
    render() {
        return (<Sidebar />);
    }
}

class Sidebar extends Component {
    render() {
        return (
            <div>
                <li>
                    <div id="addButtonDiv"></div>
                    <div id="remButtonDiv"></div>
                </li>
                <li class="active">
                    <p>Team Name:</p>
                    <input type="number" id="teamName" min="1" max="99999"></input>
                </li>
                <li>
                    <table>
                        <tr>
                            <th><a href='#overall'>Overall</a></th>
                        </tr>
                        <tr>
                            <th><a href='#cycles'>Cycles</a></th>
                        </tr>
                        <tr>
                            <th><a href='#pregame'>Pregame</a></th>
                        </tr>
                        <tr>
                            <th><a href='#endgame'>Endgame</a></th>
                        </tr>
                        <tr>
                            <th><a href='#misc'>Misc</a></th>
                        </tr>
                    </table>
                </li>
            </div>
        );
    }
}

export default Sidebar;
