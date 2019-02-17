import React, {Component} from 'react';

class CommentTextbox extends Component {
    getJSON() {
        return {"comments":'n/a'};
    }
    render() {
        return(
          <div>
            <p>Comment Textbox (If your comment doesn't fit the bill)</p>
            <form>
              <textarea name="add_comments" rows="10" cols="60"></textarea><br/>
            </form>
          </div>
        );
    }
}

export default CommentTextbox;
