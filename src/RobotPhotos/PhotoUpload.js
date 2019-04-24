import React, { Component } from 'react';

export default class PhotoUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamNum: false,
			view: 'not_selected',
			file: false
		}

		this.handleView = this.handleView.bind(this);
		this.handleTeamNum = this.handleTeamNum.bind(this);
		this.submitPhoto = this.submitPhoto.bind(this);
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

		this.fileRef = React.createRef();
	}

	async submitPhoto(e) {
		e.preventDefault();
		let btn = document.getElementById('submit');
		btn.disabled = true;
		btn.innerHTML = 'Submitting...';
		const file = this.fileRef.current.files[0];
		const view = this.state.view;
		const teamNum = this.state.teamNum;

		if (!teamNum) {
			alert('Team number not set!');
		} else if (view === 'not_selected') {
			alert('View not selected!');
		} else if (!file) {
			alert('No photo uploaded!');
		} else {
			if (window.confirm(`Submit ${this.state.view} photo for team ${this.state.teamNum}?`)) {
				const fR = new FileReader();
				fR.addEventListener('load', async () => {
					let obj = {
						teamNum: teamNum,
						view: view,
						file: fR.result,
						name: file.name
					};
					let res = await fetch('/api/v1/photos/upload', {
						method: 'POST',
						body: JSON.stringify(obj),
						headers: {
							'Content-Type': 'application/json'
						}
					});
					res = await res.json();
					alert(res.success ? 'Successfully submitted!' : 'Could not submit, please try again.');
				}, false);
				fR.readAsDataURL(file);
			}
		}
		btn.innerHTML = 'Submit';
		btn.disabled = false;
	}

	handleView(e) {
		this.setState({ view: e.target.value });
	}
	handleTeamNum(e) {
		this.setState({ teamNum: e.target.value });
	}

	render() {
		return (
			<div>
				<form onSubmit={this.submitPhoto}>
					Upload: <input type="file" accept="image/*" ref={this.fileRef} /><br />
					Team #: <input type="number" value={this.state.teamNum} onChange={this.handleTeamNum} /><br />
					View: <select value={this.state.view} onChange={this.handleView}>
						{this.viewOptions}
					</select><br />
					<button id="submit" type="submit" className="increment-button submit-btn">Submit</button>
				</form>
			</div>
		);
	}
}