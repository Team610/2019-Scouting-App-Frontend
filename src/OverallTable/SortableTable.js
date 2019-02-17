import React, { Component } from 'react';

//https://www.w3schools.com/jsref/met_table_insertrow.asp

class SortableTable extends Component {
    constructor(props) {
        super(props);
    }
    sortTable = (n) => {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable2");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc"; 
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount ++; 
            } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
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