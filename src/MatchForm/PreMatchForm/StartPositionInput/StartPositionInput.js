import React, {Component} from 'react';

class StartPositionInput extends Component {
    constructor(props){
      super(props);
      // Set base state
      this.startlevel = "1";
      this.getJSON = this.getJSON.bind(this);
    }

    getJSON() {
      if(this.startlevel==="2"){
        return {"start_on_lvl_2":true};
      }else{
        return {"start_on_lvl_2":false};
      }
    }

    render() {
        return(
          <div>
            <p class="subheader"> Indicate Starting Position  </p>
            <img src={require("./RLHAB.png")} height="240"></img>
            <p> Current level: {this.startlevel}</p>
          </div>
        );
    }
}

export default StartPositionInput;
