import React, { Component } from 'react';
import mockJSON from './teamsMock.json';

//https://www.w3schools.com/jsref/met_table_insertrow.asp

class SortableTable extends Component {
    constructor(props) {
        super(props);
        this.addTeam = this.addTeam.bind(this);
    }
    componentDidMount() {
        this.addTeam();
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
                    //Breaks if the content is not a number
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    //Breaks if the content is not a number
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
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
    addTeam() {
        let table = document.getElementById("myTable2");
        for(let key of Object.keys(mockJSON)) {
            let row = table.insertRow(1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = key;
            cell2.innerHTML = mockJSON[key]["avg_num_hatch_lv1"];
            cell3.innerHTML = mockJSON[key]["avg_num_hatch_lv2"];
            cell4.innerHTML = mockJSON[key]["avg_num_hatch_lv3"];
        }
    }
    render() {
        return (
            <div>
                <table className="sortable" id="myTable2">
                    <thead>
                        <tr>
                            <th onClick={() => this.sortTable(0)}>Team</th>
                            <th onClick={() => this.sortTable(1)}>AvgHatchLvl1</th>
                            <th onClick={() => this.sortTable(2)}>AvgHatchLvl2</th>
                            <th onClick={() => this.sortTable(3)}>AvgHatchLvl3</th>
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default SortableTable;