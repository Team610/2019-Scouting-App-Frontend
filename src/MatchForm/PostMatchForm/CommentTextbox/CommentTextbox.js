import React, {Component} from 'react';
import styles from "../../style.css";

class CommentTextbox extends Component {
    constructor(props){
      super(props);
      this.value = "ph";
      this.getJSON = this.getJSON.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    getJSON() {
        return {"other_comments":this.value};
    }

    handleChange(event){
      this.value = event.target.value;
    }

    render() {
        return(
          <div>
            <p class="subheader">Comment Textbox (If your comment doesn't fit the bill)</p>
            <form>
              <textarea input="text" name="add_comments" rows="10" cols="60"
               onChange={this.handleChange}>
              </textarea>
              <br/>
            </form>
          </div>
        );
    }
}

export default CommentTextbox;
