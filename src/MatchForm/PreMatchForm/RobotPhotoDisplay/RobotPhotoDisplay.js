import React, { Component, Fragment } from "react";

export default class RobotPhotoDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = { status: 'loading', teamNum: this.props.teamNum };
		this.photos = {};
		this.getRobotPhoto = this.getRobotPhoto.bind(this);
	}
	async componentDidMount() {
		this._isMounted = true;
		let res = await this.getRobotPhoto(this.state.teamNum);
		if (this._isMounted)
			this.setState(res);
	}
	async componentDidUpdate(prevProps) {
		if (prevProps.teamNum !== this.props.teamNum) {
			let newNum = this.props.teamNum;
			let res = await this.getRobotPhoto(newNum);
			res.teamNum = newNum;
			if (this._isMounted)
				this.setState(res);
		}
	}
	async getRobotPhoto(teamNum) {
		console.log(`getting photos for ${teamNum}`);
		if (teamNum === '') {
			return { status: 'waitingForTeam' };
		} else {
			if (this.photos[teamNum] !== undefined) {
				return ({ status: 'ok' });
			}
			let res = await fetch(`/api/v1/photos/${teamNum}/isom`);
			if (res.ok) {
				res = await res.json();
				let imgList = res.photos;
				if (imgList.length > 0) {
					console.log('new photo');
					this.photos[teamNum] = imgList[0];
				} else
					this.photos[teamNum] = 'no photos';
				return ({ status: 'ok' });
			} else {
				return { status: 'cannotLoad' };
			}
		}
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	render() {
		let body;
		switch (this.state.status) {
			case 'loading':
				body = <p>Loading photo...</p>;
				break;
			case 'waitingForTeam':
				body = <p>Waiting for team number.</p>;
				break;
			case 'cannotLoad':
				body = <p>Could not load robot photo.</p>;
				break;
			case 'ok':
				let photo = this.photos[this.state.teamNum];
				if (photo !== 'no photos')
					body = <img src={photo} alt="robot here" height="240"></img>;
				else
					body = <p>No photos for team {this.state.teamNum}</p>;
				break;
			default:
				body = <p>An error occured. Please try again.</p>;
		}
		return (
			<Fragment>
				<p className="subheader">Robot (Look for THIS one)</p>
				{body}
			</Fragment>
		)
	}
}
