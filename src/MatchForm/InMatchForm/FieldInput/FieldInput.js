import React, { Component } from "react";
import PieMenu, { Slice } from "react-pie-menu";
import DefenseInput from "./DefenseInput/DefenseInput";
import ClimbInput from "./ClimbInput/ClimbInput";

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
		this.closeMenu = this.closeMenu.bind(this);

		//Initialize empty state
		this.menu = '';
		this.menuActive = false;
		this.intake = true;
		this.mouseX = 0;
		this.mouseY = 0;
		let time = new Date().getTime();
		this.startState = { "time": time, "intake": this.props.robotPreload, "ss": true };
		this.initTime = time;
		this.defenseRef = React.createRef();
		this.climbRef = React.createRef();
		this.data = {
			'ss_cycle_hatch_lv1': [], 'ss_cycle_hatch_lv2': [], 'ss_cycle_hatch_lv3': [], 'ss_cycle_hatch_lvS': [],
			'ss_cycle_cargo_lv1': [], 'ss_cycle_cargo_lv2': [], 'ss_cycle_cargo_lv3': [], 'ss_cycle_cargo_lvS': [],
			'to_cycle_hatch_lv1': [], 'to_cycle_hatch_lv2': [], 'to_cycle_hatch_lv3': [], 'to_cycle_hatch_lvS': [],
			'to_cycle_cargo_lv1': [], 'to_cycle_cargo_lv2': [], 'to_cycle_cargo_lv3': [], 'to_cycle_cargo_lvS': [],
			'climb_lvl': '1', 'climb_time': 0.0
		};
		this.state = {
			menuRequested: false
		};
	}
	getJSON() {
		let defJSON = this.defenseRef.current.getJSON();
		for (let key of Object.keys(defJSON)) {
			this.data[key] = defJSON[key];
		}
		let climbJSON = this.climbRef.current.getJSON();
		for (let key of Object.keys(climbJSON)) {
			this.data[key] = climbJSON[key];
		}
		return this.data;
	}

	render() {
		return (
			<div ref={field => (this.instance = field)} id='fieldmap'>
				<img alt="field" className="nonSelectable" ref={image => (this.image = image)} width='75%' src={require("./RL.png")} onMouseDown={this.handleClick} />
				{this.menuActive ? this.loadMenu() : null}
				<DefenseInput ref={this.defenseRef} />
				<ClimbInput callNext = {this.props.callNext} ref={this.climbRef} />
			</div>
		);
	}

	handleClick(e) {
		//Get the mouse's coordinates relative to: (element's pos in viewport) and (window's scroll)
		this.mouseX = e.clientX + window.pageXOffset;
		this.mouseY = e.clientY + window.pageYOffset;

		// Print the mouse's coordinates to the screen (debug only)
		// let element = this.instance;
		// console.log(`mousePos: ${this.mouseX}, ${this.mouseY}`);
		// console.log(`windowPos: ${window.pageXOffset}, ${window.pageYOffset}`);
		// console.log(`elementPos: ${element.offsetLeft}, ${element.offsetTop}`);

		//Check if the menu is already active. If so, don't try to bring up another one!
		if (this.state.menuRequested) {
			console.log('menu already active!');
			this.closeMenu();
			return;
		}

		// Check which menu should be brought up:
		//   if the robot has a game piece intaked, check if the tapped zone is a scoring zone
		//   otherwise, check if the tapped zone is an intake zone
		// In each successful case, the menu should be active
		// Alternatively, if the defense zone was hit, run the defense logic
		let whichMenu = '';
		let zone = this.checkZone();
		console.log(`intake: ${this.intake}, zone: ${zone}`);
		if (zone === 'defense') {
			this.defenseRef.current.onOpenModal();
			return;
		}
		if (zone === 'HAB') {
			this.climbRef.current.onOpenModal();
			return;
		}
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
		if (whichMenu !== '') {
			this.menu = whichMenu;
			this.menuActive = true;
			this.setState({ menuRequested: true });
		}
	}
	checkZone() {
		let element = this.instance;
		let img = this.image;
		let origFieldSize = {
			width: 3252,
			height: 2786
		}
		let zones = {
			topHP: { startCoor: { x: 0, y: 0 }, endCoor: { x: 840, y: 510 } },
			btmHP: { startCoor: { x: 0, y: 2276 }, endCoor: { x: 840, y: 2786 } },
			topRocket: { startCoor: { x: 1500, y: 0 }, endCoor: { x: 2350, y: 650 } },
			btmRocket: { startCoor: { x: 1500, y: 2136 }, endCoor: { x: 2350, y: 2786 } },
			cargoShip: { startCoor: { x: 1340, y: 850 }, endCoor: { x: 2700, y: 1930 } },
			HAB: { startCoor: { x: 0, y: 945 }, endCoor: { x: 840, y: 1845 } },
			defense: { startCoor: { x: 2840, y: 0 }, endCoor: { x: 3252, y: 2786 } },
			deadZone_TopHP_HAB: { startCoor: { x: 0, y: 510 }, endCoor: { x: 840, y: 945 } },
			deadZone_BtmHP_HAB: { startCoor: { x: 0, y: 1845 }, endCoor: { x: 840, y: 2276 } },
			deadZone_other_defense: { startCoor: { x: 2700, y: 0 }, endCoor: { x: 2840, y: 2786 } },
			other1: { startCoor: { x: 1500, y: 513 }, endCoor: { x: 1900, y: 975 } }, //cutting corner off of topRocket and top-left corner of cargo ship
			other2: { startCoor: { x: 1500, y: 1805 }, endCoor: { x: 1900, y: 2273 } }, //cutting corner off of btmRocket and btm-left corner of cargo ship
			other3: { startCoor: { x: 1950, y: 513 }, endCoor: { x: 2350, y: 975 } }, //cutting btm-right corner off of topRocket
			other4: { startCoor: { x: 1950, y: 1805 }, endCoor: { x: 2350, y: 2273 } } //cutting top-right corner off of top rocket
		};

		let zone = 'other';
		//Mouse relative to element coordinates
		let mInEX = this.mouseX - element.offsetLeft;
		let mInEY = this.mouseY - element.offsetTop;
		for (let key of Object.keys(zones)) {
			if (zones[key].length === 0) {
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
		if (zone.substring(0, 5) === 'other') { zone = 'other'; }
		return zone;
	}

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
	closeMenu() {
		console.log('closing menu');
		this.menuActive = false;
		this.setState({ menuRequested: false });
	}

	recordCycleStart(intake) {
		console.log('recording cycle start');
		let startTime = new Date().getTime();
		this.startState = { "time": startTime, "intake": intake, "ss": startTime - this.initTime < 15000 ? true : false };

		this.intake = true;
		this.menuActive = false;
		this.setState({ menuRequested: false });
	}
	recordCycleEnd(level) {
		console.log('recording cycle end');
		let dur = (new Date().getTime() - this.startState.time) / 1000;
		if (this.startState.ss) {
			console.log(`ss ${this.startState.intake} lv${level}`);
			this.data[`ss_cycle_${this.startState['intake']}_lv${level}`].push(dur);
		} else {
			console.log(`to ${this.startState.intake} lv${level}`);
			this.data[`to_cycle_${this.startState['intake']}_lv${level}`].push(dur);
		}

		this.intake = false;
		this.menuActive = false;
		this.setState({ menuRequested: false });
	}

	intakeMenu() {
		return (
			<PieMenu
				radius="125px"
				centerX={`${this.mouseX}px`}
				centerY={`${this.mouseY}px`}
				centerRadius='25px'
			>
				<Slice
					onSelect={() => {
						console.log('selecting hatch');
						this.recordCycleStart("hatch");
					}}
				>
					<span className="nonSelectable">Hatch</span>
				</Slice>
				<Slice />
				<Slice
					onSelect={() => {
						console.log('selecting cargo');
						this.recordCycleStart("cargo");
					}}
				>
					<span className="nonSelectable">Cargo</span>
				</Slice>
				<Slice />
			</PieMenu>
		);
	}
	rocketMenu() {
		return (
			<PieMenu
				radius="125px"
				centerRadius="25px"
				centerX={`${this.mouseX}px`}
				centerY={`${this.mouseY}px`}
			>
				<Slice
					onSelect={() => {
						console.log('going rocket high');
						this.recordCycleEnd(3);
					}}
				>
					<span className="nonSelectable">Level 3</span>
				</Slice>
				<Slice
					onSelect={() => {
						console.log('going rocket middle');
						this.recordCycleEnd(2);
					}}
				>
					<span className="nonSelectable">Level 2</span>
				</Slice>

				<Slice
					onSelect={() => {
						console.log('going rocket low');
						this.recordCycleEnd(1);
					}}
				>
					<span className="nonSelectable">Level 1</span>
				</Slice>

				<Slice
					onSelect={() => {
						console.log('going rocket middle');
						this.recordCycleEnd(2);
					}}
				>
					<span className="nonSelectable">Level 2</span>
				</Slice>
			</PieMenu>
		);
	}
	shipMenu() {
			console.log('going cargo ship');
						this.recordCycleEnd('S');
	}
}

export default FieldIMG;
