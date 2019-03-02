import React, {Component} from 'react';

class CommentTextbox extends Component {
    constructor(props){
      super(props);
      this.value = "blank";
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
            <p className="subheader">Comment Textbox (only for the truly special!)</p>
            <form>
              <textarea input="text" name="add_comments" rows="8" cols="40"
               onChange={this.handleChange}>
              </textarea>
              <br/>
            </form>
          </div>
        );
    }
}

export default CommentTextbox;
