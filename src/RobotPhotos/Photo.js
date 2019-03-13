import React, { Component, Fragment } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import "./robotPhoto.css";

class RobotCamera extends Component {
	constructor(props) {
		super(props);
		this.state = {
			review: false,
			teamNum: undefined,
			file: undefined,
			view: 'not_selected',
			facing: 'FACING_MODES.ENVIRONMENT',
			fileName: ''
		};
		this.flipCamera = this.flipCamera.bind(this);
		this.handleView = this.handleView.bind(this);
		this.handleTeamNum = this.handleTeamNum.bind(this);

		this.photoViews = [
			{ id: "not_selected", label: "" },
			{ id: "front", label: "Front" },
			{ id: "isom", label: "Isometric" },
			{ id: "side", label: "Side" },
			{ id: "back", label: "Back" },
			{ id: "top", label: "Top" },
			{ id: "other", label: "Other" }
		]
		this.viewOptions = [];
		for (let view of this.photoViews)
			this.viewOptions.push(<option key={view.id} value={view.id}>{view.label}</option>);
	}

	onTakePhoto(dataUri) {
		this.setState({
			file: dataUri,
			review: true
		});
	}
	async submitPicture() {
		console.log(`${this.state.view} photo for team ${this.state.teamNum}:\n${this.state.file}`);
		let obj = {
			photo: this.state.file,
			view: this.state.view,
			teamNum: this.state.teamNum
		}
		let res = await fetch('/api/v1/photos', {
			method: 'POST',
			body: JSON.stringify(obj),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		res = await res.json();
		alert(res.success ? 'Successfully submitted!' : 'Could not submit, please try again.');
		res.success ? console.log('success') : console.log('fail');
	}

	flipCamera() {
		this.setState({
			facing: this.state.facing === 'FACING_MODES.ENVIRONMENT' ?
				'FACING_MODES.USER' :
				'FACING_MODES.ENVIRONMENT'
		});
	}
	handleView(e) {
		this.setState({ view: e.target.value });
	}
	handleTeamNum(e) {
		this.setState({ teamNum: e.target.value });
	}

	render() {
		//idealFacingMode={this.state.facing}
		return (
			<div className="camera-container">
				<button onClick={this.flipCamera}>Flip camera</button><br />
				<Camera
					imageType="jpg"
					onTakePhoto={dataUri => {
						this.onTakePhoto(dataUri);
					}}
				/><br />
				<form>
					Team #: <input type="number" id="teamInput" onChange={this.handleTeamNum} /><br />
					View: <select id="view" value={this.state.view} onChange={this.handleView}>
						{this.viewOptions}
					</select>
				</form>
				<p>Image: </p>{this.state.review ? <Fragment><img src={this.state.file} alt='robot' /><br /></Fragment> : null}
				<br />
				<button
					onClick={() => {
						if (!this.state.teamNum) {
							alert('Team number not set!');
						} else if (this.state.view === 'not_selected') {
							alert('View not selected!');
						} else if (!this.state.file) {
							alert('No photo taken!');
						} else {
							window.confirm(`Submit ${this.state.view} photo for team ${this.state.teamNum}?`) &&
								this.submitPicture();
						}
					}}
				>
					Submit
        		</button>
				<button
					id="retake"
					onClick={() => {
						this.state.review && this.setState({ review: false });
					}}
				>
					Retake
        		</button>
			</div>
		);
	}
}

export default RobotCamera;
