import React, {Component} from 'react';
import CommentInput from './CommentInput';

class CommentInputs extends Component {
    getJSON() {
        return {"comments":'n/a'};
    }
    render() {
        return(
          <div>
            <p> Climb Comments </p>
              <input type="checkbox" id="commentA"></input>
              <label for="commentA"> Robot tipped trying to climb. </label>
            <br/>
              <input type="checkbox" id="commentB"></input>
              <label for="commentB"> Robot tipped while climbing on another. </label>
            <br/>
              <input type="checkbox" id="commentC"></input>
              <label for="commentC"> Robot tipped while another climbed on them. </label>
            <br/><br/>
              <p> Other Comments </p>
                <input type="checkbox" id="commentD"></input>
                <label for="commentD"> Robot DC'd midmatch </label>
              <br/>
                <input type="checkbox" id="commentE"></input>
                <label for="commentE"> Robot was a no-show. </label>
              <br/>
                <input type="checkbox" id="commentF"></input>
                <label for="commentF"> Dropped several game pieces mid-cycle. </label>
          </div>
        );
    }
}

export default CommentInputs;
