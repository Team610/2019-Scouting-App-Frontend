import React, { Component } from "react";
import DefenseInput from "./DefenseInput/DefenseInput";
import ClimbInput from "./ClimbInput/ClimbInput";
import Menu from './PieMenu';

export default class FieldInput extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.checkZone = this.checkZone.bind(this);

		this.recordCycleStart = this.recordCycleStart.bind(this);
		this.recordCycleEnd = this.recordCycleEnd.bind(this);
		this.changeIntake = this.changeIntake.bind(this);

		this.loadMenu = this.loadMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.intakeMenu = this.intakeMenu.bind(this);
		this.rocketMenu = this.rocketMenu.bind(this);
		this.shipMenu = this.shipMenu.bind(this);

		let alliance = this.props.data.alliance;
		if ((alliance === 'blue' && this.props.data.blueSide === 'left') ||
			(alliance === 'red' && this.props.data.blueSide === 'right')) {
			this.leftSide = true;
		} else if ((alliance === 'blue' && this.props.data.blueSide === 'right') ||
			(alliance === 'red' && this.props.data.blueSide === 'left')) {
			this.leftSide = false;
		} else {
			alliance = 'blue';
			this.leftSide = true;
			alert('Alliance/side not properly set.');
		}
		this.imgPath = `./${alliance}-${this.leftSide ? 'left' : 'right'}.png`;

		//Initialize empty state
		this.menu = '';
		this.menuActive = false;
		this.intake = this.props.loadData ? false : this.props.data.robot_preload === 'neither' ? false : true; //not dynamic

		this.mouseX = 0;
		this.mouseY = 0;

		this.data = {};
		let gameModes = ['to', 'ss'];
		let gamePieces = ['hatch', 'cargo'];
		let scoreLocs = ['lv1', 'lv2', 'lv3', 'lvS'];
		for (let gameMode of gameModes) {
			for (let gamePiece of gamePieces) {
				for (let scoreLoc of scoreLocs) {
					let str = `${gameMode}_cycle_${gamePiece}_${scoreLoc}`
					this.data[str] = this.props.loadData ? this.props.data[str] : [];
				}
			}
		}
		this.data.climb_lvl = this.props.loadData ? this.props.data.climb_lvl : '0';
		this.data.climb_time = this.props.loadData ? this.props.data.climb_time : 0.0;

		let time = new Date().getTime();
		this.data.initTime = this.props.loadData ? this.props.data.initTime : time;
		this.startState = {
			"time": this.props.loadData ? this.data.initTime : time,
			"intake": this.props.loadData ? '' : this.props.data.robot_preload,
			"gamePeriod": (time - this.data.initTime) / 1000 > 15 ? 'to' : 'ss'
		};

		this.defenseRef = React.createRef();
		this.climbRef = React.createRef();

		this.state = {
			menuRequested: false
		};

		console.log(this.data);
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
				<img alt="field"
					className="nonSelectable"
					ref={image => (this.image = image)}
					height={window.innerHeight * 0.7}
					src={require(`${this.imgPath}`)}
					onMouseDown={this.handleClick}
					style={{ float: "left" }} />
				{this.intake ?
					<div style={{ float: "left", padding: "5px", color: "yellow", fontSize: "20px" }} onClick={this.changeIntake}>
						{this.startState.intake === "cargo" ? "Cargo cycle" : "Hatch cycle"}
					</div> : null}
				{this.menuActive ? this.loadMenu() : null}
				<DefenseInput
					ref={this.defenseRef}
					data={this.data}
					loadData={this.props.loadData} />
				<ClimbInput
					callNext={this.props.callNext}
					ref={this.climbRef}
					initTime={this.data.initTime}
					data={this.data}
					loadData={this.props.loadData} />
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

			let lft = (this.leftSide ? zones[key].startCoor.x : origFieldSize.width - zones[key].endCoor.x) * img.width / origFieldSize.width;
			let rit = (this.leftSide ? zones[key].endCoor.x : origFieldSize.width - zones[key].startCoor.x) * img.width / origFieldSize.width;
			let top = zones[key].startCoor.y * img.height / origFieldSize.height;
			let btm = zones[key].endCoor.y * img.height / origFieldSize.height;

			if (mInEX >= lft && mInEX <= rit && mInEY >= top && mInEY <= btm) {
				zone = key;
			}
		}
		if (zone.substring(0, 5) === 'other') { zone = 'other'; }
		return zone;
	}

	recordCycleStart(intake) {
		console.log('recording cycle start');
		let dur = (new Date().getTime() - this.data.initTime) / 1000;
		console.log(`${this.startState.gamePeriod} ${intake} @ ${this.startState.time}`);
		this.startState = {
			"time": this.startState.time,
			"intake": intake,
			"gamePeriod": dur < 15 ? 'ss' : 'to'
		};

		this.intake = true;
		this.menuActive = false;
		this.setState({ menuRequested: false });
	}
	recordCycleEnd(level) {
		console.log('recording cycle end');
		let endTime = new Date().getTime();
		let dur = (endTime - this.startState.time) / 1000;
		console.log(`${this.startState.gamePeriod} ${this.startState.intake} lv${level}`);
		this.data[`${this.startState.gamePeriod}_cycle_${this.startState.intake}_lv${level}`].push(dur);

		this.intake = false;
		this.menuActive = false;
		this.startState = { "time": endTime };
		this.setState({ menuRequested: false });
	}
	changeIntake() {
		let newType = this.startState.intake === "cargo" ? "hatch" : "cargo";
		console.log(`switching intake type to ${newType}`);
		this.startState.intake = newType;
		this.setState({ menuRequested: false });
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
	intakeMenu() {
		let intakeSlices = [
			{
				label: 'Hatch',
				logMsg: 'selecting hatch',
				val: 'hatch'
			},
			{
				blank: true
			},
			{
				label: 'Cargo',
				logMsg: 'selecting cargo',
				val: 'cargo'
			},
			{
				blank: true
			}
		];
		return (
			<Menu
				slices={intakeSlices}
				func={this.recordCycleStart}
				mouseX={this.mouseX}
				mouseY={this.mouseY}
			/>
		);
	}
	rocketMenu() {
		let rocketSlices = [
			{
				label: 'Level 3',
				logMsg: 'going rocket high',
				val: 3
			},
			{
				label: 'Level 2',
				logMsg: 'going rocket middle',
				val: 2
			},
			{
				label: 'Level 1',
				logMsg: 'going rocket low',
				val: 1
			},
			{
				label: 'Level 2',
				logMsg: 'going rocket middle',
				val: 2
			}
		]
		return (
			<Menu
				slices={rocketSlices}
				func={this.recordCycleEnd}
				mouseX={this.mouseX}
				mouseY={this.mouseY}
			/>
		);
	}
	shipMenu() {
		let confBtnStyle = {
			position: "absolute",
			height: '40px',
			width: '100px',
			left: this.mouseX - 50,
			top: this.mouseY - 20,
			backgroundColor: '#6D6D6D',
			border: 'none',
			fontSize: '16px',
			textAlign: 'center'
		}
		return (
			<button
				onClick={() => { console.log('going cargo ship'); this.recordCycleEnd('S'); }}
				style={confBtnStyle}
			>
				Confirm
			</button>
		);
	}
}
