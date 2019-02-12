import React, {Component} from 'react';

class ClimbLevelInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value:'Lv0'};
        this.selectLevel = this.selectLevel.bind(this);
        this.getJSON = this.getJSON.bind(this);
    }
    getJSON() {
        return ({
            [this.props.id]:this.state.value.substr(2)
        }); //TODO: make this less sketchy
    }
    selectLevel(level) {
        this.setState({
            value:level
        });
    }
    render() {
        return (
            <div>
                Climb level:<br/>
                <button type="button" onClick={() => this.selectLevel('Lv3')} className={this.state.value==='Lv3'? 'btn-active' : 'btn-inactive'}>Level 3</button><br/>
                <button type="button" onClick={() => this.selectLevel('Lv2')} className={this.state.value==='Lv2'? 'btn-active' : 'btn-inactive'}>Level 2</button><br/>
                <button type="button" onClick={() => this.selectLevel('Lv1')} className={this.state.value==='Lv1'? 'btn-active' : 'btn-inactive'}>Level 1</button><br/>
                <button type="button" onClick={() => this.selectLevel('Lv0')} className={this.state.value==='Lv0'? 'btn-active' : 'btn-inactive'}>Did not climb</button><br/>
            </div>
        );
    }
}

export default ClimbLevelInput;