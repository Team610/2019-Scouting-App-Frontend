import React, { Component } from "react";
import ReactDOM from "react-dom";
import PieMenu, { Slice } from "react-pie-menu";
var topHP = [110, 60, 210, 145];
var bottomHP = [110, 285, 210, 365];
var topRocket = [310, 60, 350, 100];
var bottomRocket = [310, 325, 350, 365];
var cargoShip = [320, 190, 425, 245];
var HAB = [110, 145, 210, 285];

class FieldIMG extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mouseX: 0,
			mouseY: 0,
			objectiveY: 0,
			menu: false,
			secondStage: false,
			close: false,
			intake: true,
			topOffset: 0
		};
	}

	checkBounds(a) {
		var bool = false;

		if (
			this.state.mouseX >= a[0] &&
			this.state.mouseX <= a[2] &&
			this.state.objectiveY >= a[1] &&
			this.state.objectiveY <= a[3]
		) {
			bool = true;
		} else {
			bool = false;
		}
		return bool;
	}

	render() {
		return (
			<div ref={field => (this.instance = field)}>
				<div>
					<h2>
						{this.state.mouseX}, {this.state.objectiveY}
					</h2>
				</div>
				<div onMouseDown={this.getClickPosition}>
					<div>
						<img src={require("./2019-field.PNG")} />

						{this.loadMenu()}
					</div>
				</div>
			</div>
		);
	}

	getClickPosition = e => {
		this.setState({ mouseX: e.clientX });
		this.setState({
			objectiveY: e.clientY - this.instance.getBoundingClientRect().top
		});
		this.setState({ menu: true });
	};

	loadMenu = () => {
		if (this.state.close === true) {
			this.setState({ menu: false });
			this.setState({ close: false });
		}
		if (this.state.menu === false && this.state.secondStage === true) {
			this.setState({ secondStage: false });
		}
		if (this.checkBounds(topRocket) && this.state.intake === true) {
			return this.returnMenuTwo();
		}
		if (this.checkBounds(bottomRocket) && this.state.intake === true) {
			return this.returnMenuTwo();
		} else if (
			this.checkBounds(cargoShip) === true &&
			this.state.intake === true
		) {
			this.setState({ intake: false });
		} else if (
			this.checkBounds(HAB) == false &&
			this.checkBounds(topHP) === false &&
			this.checkBounds(bottomHP) === false &&
			this.checkBounds(topRocket) === false &&
			this.checkBounds(bottomRocket) == false &&
			this.checkBounds(cargoShip) == false &&
			this.state.intake === false
		) {
			return this.returnMenuOne();
		} else if (this.checkBounds(topHP)) {
			return this.returnMenuOne();
		} else if (this.checkBounds(bottomHP)) {
			return this.returnMenuOne();
		}
	};

	returnMenuOne = () => {
		return this.state.menu ? (
			<PieMenu
				radius="125px"
				centerRadius="20px"
				centerX={`${this.state.mouseX}px`}
				centerY={`${this.state.objectiveY + 500}px`}
			>
				<div />
				<Slice
					className="nonSelectable"
					onSelect={() => {
						this.setState({ menu: false });
						this.setState({ intake: true });
					}}
				>
					<p className="nonSelectable">Hatch</p>
				</Slice>
				<div />
				<Slice
					className="nonSelectable"
					onSelect={() => {
						this.setState({ menu: false });
						this.setState({ intake: true });
					}}
				>
					<p className="nonSelectable">Cargo</p>
				</Slice>
			</PieMenu>
		) : null;
	};

	returnMenuTwo = () => {
		return this.state.menu ? (
			<html>
				<PieMenu
					radius="125px"
					centerRadius="20px"
					centerX={`${this.state.mouseX}px`}
					centerY={`${this.state.objectiveY + 500}px`}
				>
					<Slice
						className="nonSelectable"
						onSelect={() => {
							this.setState({ menu: false });
							this.setState({ intake: false });
						}}
					>
						<p className="nonSelectable">Level 1</p>
					</Slice>
					<Slice
						className="nonSelectable"
						onSelect={() => {
							this.setState({ menu: false });
							this.setState({ intake: false });
						}}
					>
						<p className="nonSelectable">Level 2</p>
					</Slice>

					<Slice
						className="nonSelectable"
						onSelect={() => {
							this.setState({ menu: false });
							this.setState({ intake: false });
						}}
					>
						<p className="nonSelectable">Level 3</p>
					</Slice>
				</PieMenu>
			</html>
		) : null;
	};
}

export default FieldIMG;