import React, {Component} from 'react';
import "../../style.css";

class CommentCheckboxInput extends Component {
    constructor(props){
      super(props);
      this.value = false;
      this.handleChange = this.handleChange.bind(this);
    }
    getJSON() {
      let obj = {};
      obj[this.props.inputId] = this.value;
      return obj;
    }
    handleChange() {
      this.value = !this.value;
      console.log(this.value);
    }
    render() {
        return(
          <label className="comment">
            <input type="checkbox" id={this.props.inputId} onChange={this.handleChange} />
            {this.props.description}
          </label>
      );
    }
}

export default CommentCheckboxInput;
