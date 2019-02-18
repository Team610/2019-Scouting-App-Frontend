import React, {Component} from 'react';
import "../../style.css";

class CommentRadioInput extends Component {
    constructor(props) {
      super(props);
      this.value = "None selected";
      this.handleChange = this.handleChange.bind(this);
      this.getJSON = this.getJSON.bind(this);
    }

    getJSON() {
      let obj={};
      obj[this.props.inputId] = this.value;
      return obj;
    }

    handleChange(event) {
      this.value = event.target.value;
      console.log(this.value);
    }

    render() {
      let choiceList = [];
      for(let choice of this.props.choices) {
          choiceList.push(<label key={choice.value} className="comment"><input type="radio" name={this.props.inputId} value={choice.value} onChange={this.handleChange} />{choice.description}<br/></label>);
        }
      return(
          <div>
              <p className="subheader">{this.props.description}</p>
              <label>{choiceList}</label>
          </div>
      );
      }

}
export default CommentRadioInput;
