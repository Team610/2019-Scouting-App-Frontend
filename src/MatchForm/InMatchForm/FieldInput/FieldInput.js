import React, { Component } from "react";
import PieMenu, { Slice } from "react-pie-menu";

class FieldIMG extends Component {
	constructor(props) {
		super(props);

		//Bind all methods
		this.handleClick = this.handleClick.bind(this);
		this.checkZone = this.checkZone.bind(this);
		this.loadMenu = this.loadMenu.bind(this);
		this.recordCycleStart = this.recordCycleStart.bind(this);
		this.recordCycleEnd = this.recordCycleEnd.bind(this);
		this.intakeMenu = this.intakeMenu.bind(this);
		this.rocketMenu = this.rocketMenu.bind(this);
		this.shipMenu = this.shipMenu.bind(this);

		//Initialize empty state
		this.menu = '';
		this.menuActive = false;
		this.intake = false;
		this.mouseX = 0;
		this.mouseY = 0;
		this.startState = {};
		this.data = {
			'cycle_hatch_lv1':[],'cycle_hatch_lv2':[],'cycle_hatch_lv3':[],'cycle_hatch_lvS':[],
			'cycle_cargo_lv1':[],'cycle_cargo_lv2':[],'cycle_cargo_lv3':[],'cycle_cargo_lvS':[],
			'def_tough_defense':[], 'def_rocket_goalkeep':[], 'def_ship_goalkeep':[], 'def_pinning':[], 'def_driving_around':[],
			'climb_lvl':'1','climb_time':0.0
		};
		this.state = {
			menuRequested: false
		};
	}

	getJSON() {
		return this.data;
	}
	checkZone() {
		let element = this.instance;
		let img = this.image;
		let origFieldSize = {
			width:3252,
			height:2786
		}
		let zones = {
			topHP: {startCoor:{x: 0, y: 0}, endCoor:{x: 840, y: 510}},
			btmHP: {startCoor:{x: 0, y: 2276}, endCoor:{x: 840, y: 2786}},
			topRocket: {startCoor:{x:1500, y:0}, endCoor:{x:2350, y:650}},
			btmRocket: {startCoor:{x:1500, y: 2136}, endCoor:{x: 2350, y: 2786}},
			cargoShip: {startCoor:{x:1340, y: 850}, endCoor:{x: 2700, y: 1930}},
			HAB: {startCoor:{x:0, y:945}, endCoor:{x:840, y:1845}},
			defense: {startCoor:{x:2840, y:0}, endCoor:{x:3252, y:2786}},
			deadZone_TopHP_HAB: {startCoor:{x:0, y:510}, endCoor:{x:840, y:945}},
			deadZone_BtmHP_HAB: {startCoor:{x:0, y:1845}, endCoor:{x:840, y:2276}},
			deadZone_other_defense: {startCoor:{x:2700, y:0}, endCoor:{x:2840, y:2786}}
		};

		let zone = 'other';
		//Mouse relative to element coordinates
		let mInEX = this.mouseX - element.offsetLeft;
		let mInEY = this.mouseY - element.offsetTop;
		for (let key of Object.keys(zones)) {
			if(zones[key].length===0) {
				continue;
			}

			let lft = zones[key].startCoor.x * img.width / origFieldSize.width;
			let rit = zones[key].endCoor.x * img.width / origFieldSize.width;
			let top = zones[key].startCoor.y * img.height / origFieldSize.height;
			let btm = zones[key].endCoor.y * img.height / origFieldSize.height;

			if (mInEX >= lft && mInEX <= rit && mInEY >= top && mInEY <= btm) {
				zone = key;
			}
		}
		return zone;
	}

	render() {
		return (
			<div ref={field => (this.instance = field)} id='fieldmap'>
				<img className="nonSelectable" ref={image => (this.image = image)} width='75%' src={require("./RL.png")} onMouseDown={this.handleClick}/>
				{this.menuActive ? this.loadMenu() : null}
			</div>
		);
	}

	handleClick = e => {
		//Get the mouse's coordinates relative to: (element's pos in viewport) and (window's scroll)
		this.mouseX = e.clientX + window.pageXOffset;
		this.mouseY = e.clientY + window.pageYOffset;

		// Print the mouse's coordinates to the screen (debug only)
		// let element = this.instance;
		// console.log(`mousePos: ${this.mouseX}, ${this.mouseY}`);
		// console.log(`windowPos: ${window.pageXOffset}, ${window.pageYOffset}`);
		// console.log(`elementPos: ${element.offsetLeft}, ${element.offsetTop}`);

		//Check if the menu is already active. If so, don't try to bring up another one!
		if(this.state.menuRequested) {
			console.log('menu already active!');
			return;
		}

		// Check which menu should be brought up:
		//   if the robot has a game piece intaked, check if the tapped zone is a scoring zone
		//   otherwise, check if the tapped zone is an intake zone
		// In each successful case, the menu should be active
		// TODO: Include logic for defense cycles
		let whichMenu = '';
		let zone = this.checkZone();
		console.log(`intake: ${this.intake}, zone: ${zone}`);
		if (this.intake) {
			if (zone === 'topRocket' || zone === 'btmRocket') {
				console.log('rocket selected');
				whichMenu = 'rocket';
			} else if (zone === 'cargoShip') {
				console.log('ship selected');
				whichMenu = 'ship';
			}
		} else {
			if (zone === 'topHP' || zone === 'btmHP') {
				console.log('hp intake selected');
				whichMenu = 'intake';
			} else if (zone === 'other') {
				console.log('ground intake selected');
				whichMenu = 'intake';
			}
		}

		//Check if a menu was selected
		if(whichMenu !== '') {
			this.menu = whichMenu;
			this.menuActive = true;
			this.setState({menuRequested: true});
		}
	};

	loadMenu() {
		//Load the appropriate menu
		console.log(`loading ${this.menu} menu`);
		if (this.menu === 'rocket') {
			return this.rocketMenu();
		} else if (this.menu === 'ship') {
			return this.shipMenu();
		} else if (this.menu === 'intake') {
			return this.intakeMenu();
		}
	}

	recordCycleStart(intake) {
		console.log('recording cycle start');
		let startTime = new Date().getTime();
		this.startState = {"time":startTime, "intake":intake};

		this.intake = true;
		this.menuActive = false;
		this.setState({ menuRequested: false });
	}

	recordCycleEnd(level) {
		console.log('recording cycle end');
		let dur = (new Date().getTime() - this.startState.time)/1000;
		this.data[`cycle_${this.startState['intake']}_lv${level}`].push(dur);

		this.intake = false;
		this.menuActive = false;
		this.setState({ menuRequested: false });
	}

	intakeMenu() {
		return (
			<PieMenu
				radius="125px"
				centerRadius="20px"
				centerX={`${this.mouseX}px`}
				centerY={`${this.mouseY}px`}
			>
				<Slice
					onSelect={() => {
						console.log('selecting hatch');
						this.recordCycleStart("hatch");
					}}
				>
					<p className="nonSelectable">Hatch</p>
				</Slice>
				<Slice
					onSelect={() => {
						console.log('selecting cargo');
						this.recordCycleStart("cargo");
					}}
				>
					<p className="nonSelectable">Cargo</p>
				</Slice>
			</PieMenu>
		);
	}

	rocketMenu() {
		return (
			<PieMenu
				radius="125px"
				centerRadius="20px"
				centerX={`${this.mouseX}px`}
				centerY={`${this.mouseY}px`}
			>
				<Slice
					onSelect={() => {
						console.log('going rocket high');
						this.recordCycleEnd(3);
					}}
				>
					<p className="nonSelectable">Level 3</p>
				</Slice>
				<Slice
					onSelect={() => {
						console.log('going rocket middle');
						this.recordCycleEnd(2);
					}}
				>
					<p className="nonSelectable">Level 2</p>
				</Slice>

				<Slice
					onSelect={() => {
						console.log('going rocket low');
						this.recordCycleEnd(1);
					}}
				>
					<p className="nonSelectable">Level 1</p>
				</Slice>

				<Slice
					onSelect={() => {
						console.log('going rocket middle');
						this.recordCycleEnd(2);
					}}
				>
					<p className="nonSelectable">Level 2</p>
				</Slice>
			</PieMenu>
		);
	}

	shipMenu() {
		return (
			<PieMenu
				radius="125px"
				centerRadius="20px"
				centerX={`${this.mouseX}px`}
				centerY={`${this.mouseY}px`}
			>
				<Slice
					onSelect={() => {
						console.log('going cargo ship');
						this.recordCycleEnd('S');
					}}
				>
					<p className="nonSelectable">Cargo Ship</p>
				</Slice>
			</PieMenu>
		);
	}
}

export default FieldIMG;
