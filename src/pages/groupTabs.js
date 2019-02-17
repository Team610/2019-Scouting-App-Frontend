import React, { Component } from 'react';
import './coolcode.css';

class groupTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [610, 1114, 5687, 1305],
      
      dataTEL: [
        [7, 4, 2, 3],
        [5, 6, 3, 6]
      ],
      dataSS: [
        [1, 1, 2, 0],
        [1, 1, 0, 1]
      ],

      currData: [[0],[0]],

      currPressed: "ALL"
    }
  }

  componentDidMount() {
    this.setData(this.state.dataALL);
  }
  componentWillMount() {
    this.addALL();
  }

  setData(coolData){
    const currData = coolData;
    this.setState({currData});
  }

  addALL(){
    let dataALL = new Array(2);
    for (let i = 0; i < dataALL.length; i++) {
      dataALL[i] = new Array(4);
    }

    for(let i = 0; i < 2; i++){
      for(let j = 0; j < this.state.teams.length; j++){
        dataALL[i][j] = this.state.dataSS[i][j] + this.state.dataTEL[i][j];
      }
    }
    this.setState({dataALL});
  }
  
  render() { 
    return (<div>
      <button onMouseDown={() => {this.setData(this.state.dataSS); 
        this.setState({currPressed: "SS"})}} 
        className={this.state.currPressed === "SS"?"buttonSelect":"buttonSelectnt"}>SS</button>
      <button onMouseDown={() => {this.setData(this.state.dataTEL);
        this.setState({currPressed: "TEL"})}} 
        className={this.state.currPressed === "TEL"?"buttonSelect":"buttonSelectnt"}>TEL</button>
      <button onMouseDown={() => {this.setData(this.state.dataALL);
        this.setState({currPressed: "ALL"})}} 
        className={this.state.currPressed === "ALL"?"buttonSelect":"buttonSelectnt"}>ALL</button>
      <table>
      <tr>
          <th></th>
          <th>Hatch</th> 
          <th>Cargo</th>
        </tr>
      
      {this.state.teams.map((r, index) => (
        <tr>
          <td className="team">{r}</td>
          <td>{this.state.currData[0][index]}</td>
          <td>{this.state.currData[1][index]}</td>    
        </tr>
        ))}
      </table>
      
    </div>);
  }
}
export default groupTabs;