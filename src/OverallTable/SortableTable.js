import React, { Component } from 'react';

class SortableTable extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            <script src="sorttable.js"></script>
                <table class="sortable">
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Climb</th>
                            <th>Cycles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>610:</td>
                            <td>8s</td>
                            <td>6s</td>
                        </tr>
                        <tr>
                            <td>188:</td>
                            <td>10s</td>
                            <td>5s</td>
                        </tr>
                        <tr>
                            <td>4476:</td>
                            <td>11s</td>
                            <td>8s</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SortableTable;