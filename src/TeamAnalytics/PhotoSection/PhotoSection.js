import React, { Component, Fragment } from 'react';

export default class PhotoSection extends Component {
	constructor(props) {
		super(props);
		this.getPhotos = this.getPhotos.bind(this);
		this.viewList = { //TODO: find a more proper way to add these
			front: "Front",
			isom: "Isometric",
			side: "Side",
			back: "Back",
			top: "Top",
			other: "Other"
		};
		this.state = {
			photos: {},
			view: '',
			status: 'loading'
		};
	}
	async componentDidMount() {
		this._isMounted = true;
		await this.getPhotos(this.props.teamNum, this.state.view);
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	componentDidUpdate(prevProps) {
		if (prevProps.teamNum !== this.props.teamNum && this._isMounted)
			this.setState({ photos: {}, view: '' });
	}
	async getPhotos(team, view) {
		if (view === '') { //TODO: find better way to handle view: ''
			if (this._isMounted)
				this.setState({ status: 'ready' });
			return;
		}
		if (this.state.photos[view] !== undefined) {
			this.setState({ view: view });
			return;
		}
		let res = await fetch(`/api/v1/photos/${team}/${view}`);
		if (res.ok) {
			res = await res.json();
			const imgList = res.photos;
			if (imgList.success === false) {
				alert("Unable to load photos.");
			}
			let newPhotos = this.state.photos;
			newPhotos[view] = imgList.length > 0 ? imgList : [{ status: `No ${view} photos for team ${team} found.` }];
			if (this._isMounted)
				this.setState({ photos: newPhotos, view: view, status: 'ready' });
		}
	}
	render() {
		const inactiveClass = 'btn-link';
		const activeClass = 'btn-link active';
		const viewBtns = [];
		for (let view of Object.keys(this.viewList)) {
			viewBtns.push(
				<li key={view}>
					<button
						className={view === this.state.view ? activeClass : inactiveClass}
						onClick={() => this.getPhotos(this.props.teamNum, view)}
					>
						{this.viewList[view]}
					</button>
				</li>
			);
		}
		if (this.state.status !== 'ready') {
			return (<Fragment>Loading...</Fragment>);
		}
		let dispPhotos = [];
		if (this.state.view.length > 0) {
			let statePhotos = this.state.photos[this.state.view];
			for (let i = 0; i < statePhotos.length; i++) {
				dispPhotos.push(typeof statePhotos[i] === 'object' ? <p key={i}>{statePhotos[i].status}</p> : <img key={i} src={statePhotos[i]} alt='' width='50%' />);
			}
		}
		return (
			<Fragment>
				<ul>{viewBtns}</ul>
				{dispPhotos}
			</Fragment>
		);
	}
}
