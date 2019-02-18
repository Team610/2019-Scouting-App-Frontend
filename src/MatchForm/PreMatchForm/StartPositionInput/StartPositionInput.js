import React, {Component} from 'react';

class StartPositionInput extends Component {
    constructor(props){
      super(props);
      // Set base state
      this.state = {
        value:"false"
      };
      this.getJSON = this.getJSON.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    getJSON() {
        return {"start_on_lvl_2":this.state.value};
    }

    handleChange(event){
      this.setState({
        value: event.target.value
      });
    }

    render() {
        return(
          <div>
            <p className="subheader"> Select Start Position  </p>
            <img src={require("./RLHAB.png")} height="160" alt="start position"/><br/>
            <label className="comment">
              <input checked={this.state.value==="false"} type="radio" name="startPos" value="false" onChange={this.handleChange}></input>
              Level 1
            </label><br/>
            <label className="comment">
              <input checked={this.state.value==="true"} type="radio" name="startPos" value="true" onChange={this.handleChange}></input>
              Level 2
            </label><br/>
          </div>
        );
    }
}

export default StartPositionInput;
