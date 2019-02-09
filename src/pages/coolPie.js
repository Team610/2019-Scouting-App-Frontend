import React, { Component } from 'react';
import PieMenu, { Slice } from 'react-pie-menu';
import './coolcode.css';

class coolPie extends Component {
    constructor(props) {
        super(props);
        this.state = {popup: false}
    }

    loadPie(){
        return (this.state.popup?<PieMenu 
            radius='125px' 
            centerRadius='20px'
            //centerX='1000px'
            //centerY='200px'   
        >
            <div/>
            <Slice className="nonSelectable" onSelect={() => {this.setState({popup: false})}}><p className="nonSelectable">Hatch</p></Slice>
            <div/>
            <Slice className="nonSelectable" onSelect={() => {this.setState({popup: false})}}><p className="nonSelectable">Cargo</p></Slice>
        </PieMenu>:null)
    }
    loadButton(){
        return (!this.state.popup?<button 
                className="tapSlide" 
                onMouseDown={() => {this.setState({popup: true})}}>
                </button>:null)
    }
    render() { 
        return (<div>
            {this.loadButton()}
            {this.loadPie()}
        </div>);
    }
}
 
export default coolPie;