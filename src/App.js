import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import './App.css';
import Login from './Auth/Login';
import Logout from './Auth/Logout';

const googleClientId = "609299116953-at08rh33j3ggljmn33atjpp4uaqunc0s.apps.googleusercontent.com";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			isAuth: false
		}
		this.googleResponse = this.googleResponse.bind(this);
		this.onLoginFail = this.onLoginFail.bind(this);
		this.logout = this.logout.bind(this);
	}
	componentDidMount() {
		let userStored = sessionStorage.getItem('user');
		console.log(userStored);
		if (userStored && JSON.parse(userStored).role >= 0) {
			this.setState({
				user: JSON.parse(userStored),
				isAuth: true
			});
		}
	}

	googleResponse(res) {
		console.log(JSON.stringify(res.profileObj));
		// const tokenBlob = new Blob([JSON.stringify({ access_token: res.accessToken }, null, 2)], { type: 'application/json' });
		fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify(res.profileObj),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			console.log(res);
			if (res.ok) {
				res.json().then(user => {
					if (user.role.low >= 0) {
						user.role = user.role.low;
					}
					if (user.role >= 0) {
						sessionStorage.setItem('user', JSON.stringify(user));
						this.setState({
							user: user,
							isAuth: true
						});
					} else {
						sessionStorage.removeItem('user');
						this.setState({
							user: null,
							isAuth: true
						});
					}
				});
			}
		});
	}
	onLoginFail = (err) => {
		alert(JSON.stringify(err));
	}

	logout = () => {
		sessionStorage.removeItem('user');
		console.log('logged out!');
		this.setState({
			isAuth: false,
			user: null
		});
		window.location.assign("https://accounts.google.com/Logout?hl=en&continue=https://support.google.com/mail/answer/8154%3Fhl%3Den");
	}

	render() {
		if (!this.state.isAuth) {
			return (
				<Fragment>
					<p>Please log in</p>
					<Login googleResponse={this.googleResponse} onFail={this.onLoginFail} clientId={googleClientId} />
				</Fragment>
			);
		} else {
			if (this.state.user === null || this.state.user === undefined) {
				return (
					<Fragment>
						<p>Unable to log in</p>
						<Logout onLogoutSuccess={this.logout} />
					</Fragment>
				);
			}
			if (this.state.user.role > 0) {
				return (
					<Router>
						<AdminRouter user={this.state.user} logout={this.logout} />
					</Router>
				);
			} else {
				return (
					<Router>
						<ScoutRouter user={this.state.user} logout={this.logout} />
					</Router>
				);
			}
		}
	}
}

const Home = () => <h2>Home</h2>;
class Loading extends Component {
	render() {
		// console.log(this.props);
		if (this.props.error) {
			return (
				<div>Error! Please try again.</div>
			);
		} else if (this.props.pastDelay) {
			return (
				<div>Loading {this.props.page}...</div>
			);
		} else {
			return null;
		}
	}
}

const AdminRouter = (props) => (
	<div>
		<ul>
			<li><NavLink to="/">Home</NavLink></li>
			<li><NavLink to="/form">Form</NavLink></li>
			<li><NavLink to="/teams">Teams</NavLink></li>
			<li><NavLink to="/overall">Overall</NavLink></li>
			<li><NavLink to="/config">Configs</NavLink></li>
			<li><NavLink to="/robotPhotos">Robot Photos</NavLink></li>
			<li style={{ float: "right" }}>Welcome, Admin {props.user.name} &nbsp;<Logout logout={props.logout} /></li>
		</ul>

		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/form" render={() => <AdminMatchSelect user={props.user} />} />
			<Route path="/teams" component={Teams} />
			<Route path="/overall" component={OverallTable} />
			<Route path="/config" render={() => <ConfigPage user={props.user} />} />
			<Route path="/robotPhotos" component={RobotPhotos} />
			<Route component={Err404} />
		</Switch>
	</div>
);
const ScoutRouter = (props) => (
	<div>
		<ul>
			<li><NavLink to="/">Home</NavLink></li>
			<li><NavLink to="/form">Form</NavLink></li>
			<li><NavLink to="/overall">Overall</NavLink></li>
			<li><NavLink to="/robotPhotos">Robot Photos</NavLink></li>
			<li style={{ float: "right" }}>Welcome, Scout {props.user.name} &nbsp; <Logout logout={props.logout} /></li>
		</ul>

		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/form" render={() => <ScoutMatchForm user={props.user} />} />
			<Route path="/overall" component={OverallTable} />
			<Route path="/robotPhotos" component={RobotPhotos} />
			<Route component={Err404} />
		</Switch>
	</div>
);

const ScoutMatchForm = Loadable({
	loader: () => import("./MatchForm/ScoutMatchForm"),
	loading: Loading
});
const AdminMatchSelect = Loadable({
	loader: () => import("./MatchForm/AdminMatchSelect"),
	loading: Loading
});

const Teams = Loadable({
	loader: () => import("./TeamAnalytics/MultiTeamView"),
	loading: Loading
});

const OverallTable = Loadable({
	loader: () => import("./OverallTable/SortableTable"),
	loading: Loading
});

const RobotPhotos = Loadable({
	loader: () => import("./RobotPhotos/PhotoUpload"),
	loading: Loading
});

const ConfigPage = Loadable({
	loader: () => import("./ConfigPage/ConfigPage"),
	loading: Loading
});

const Err404 = () => (<div>404 Error: Page not found</div>);
