import React, {Component} from 'react';
import MatchFormHeader from './MatchFormHeader/MatchFormHeader';
import PreMatchForm from './PreMatchForm/PreMatchForm';
import InMatchForm from './InMatchForm/InMatchForm';
import PostMatchForm from './PostMatchForm/PostMatchForm';
import {Redirect} from 'react-router';
import "./style.css";

class MatchForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            matchNum: this.props.match.params.matchId
        }

        this.preMatchRef = React.createRef();
        this.inMatchRef = React.createRef();
        this.postMatchRef = React.createRef();
        this.viewRefs = [this.preMatchRef, this.inMatchRef, this.postMatchRef];
    }
    async submitForm() {
        let obj = {matchNum: this.state.matchNum};
        for (let i=0; i<this.viewRefs.length; i++) {
            let viewJSON = this.viewRefs[i].current.getJSON();
            for (let key in viewJSON) {
                obj[key]=viewJSON[key];
            }
        }
        console.log(JSON.stringify(obj));

		// Submit the form!
        let status;
        try {
			console.log("trying to submit form");
            status = await fetch('/api/v1/submitForm', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.log("could not submit form");
            console.log(err.message);
        }
        if(!status.success) {console.log("form submission failed")}
        this.setState({
            redirect: true
        });
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }
        //TODO: add team selector back in
        return (
            <div>
                <MatchFormHeader matchNum={this.state.matchNum} /><hr/>
                <PreMatchForm matchNum={this.state.matchNum} ref={this.preMatchRef} /><hr/>
                <InMatchForm ref={this.inMatchRef} /><hr/>
                <PostMatchForm ref={this.postMatchRef} />
                <button id="submit" type="button" onClick={this.submitForm} style={{float:'right'}}>Submit</button>
            </div>
        );
    }
}

export default MatchForm;
