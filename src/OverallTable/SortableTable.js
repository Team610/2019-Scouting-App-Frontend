import React, { Component } from 'react';
import './style.css';

//https://www.w3schools.com/jsref/met_table_insertrow.asp

class SortableTable extends Component {
    sortTable = (n) => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable2");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    render() {
        return (
            <div>
            <script src="sorttable.js"></script>
                <table className="sortable" id="myTable2">
                    <thead>
                        <tr>
                            <th onClick={() => this.sortTable(0)}>Team</th>
                            <th onClick={() => this.sortTable(1)}>Climb</th>
                            <th onClick={() => this.sortTable(2)}>Cycles</th>
                            <th onClick={() => this.sortTable(3)}>Avg Rp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 610</td>
                            <td> 8s</td>
                            <td> 6s</td>
                            <td>3.5</td>
                        </tr>
                        <tr>
                            <td> 188</td>
                            <td>10s</td>
                            <td> 5s</td>
                            <td>3.2</td>
                        </tr>
                        <tr>
                            <td>4476</td>
                            <td>11s</td>
                            <td> 8s</td>
                            <td>2.5</td>
                        </tr>
                        <tr>
                            <td> 771</td>
                            <td>12s</td>
                            <td> 4s</td>
                            <td>2.8</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SortableTable;
