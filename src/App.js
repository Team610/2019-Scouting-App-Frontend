import React from "react";
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
// import SampleImportPage from "./pages/samplePage";
import Loadable from "react-loadable";
import './App.css'; //TODO: make CSS modularized
import Login from './Auth/Login';
import Logout from './Auth/Logout';

const googleClientId = "609299116953-at08rh33j3ggljmn33atjpp4uaqunc0s.apps.googleusercontent.com";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { //TODO: make authenticated information persistent
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
		});
	}
	onLoginFail = (err) => {
		alert(JSON.stringify(err));
	}

	logout = () => {
		sessionStorage.removeItem('user');
		this.setState({
			isAuth: false,
			user: null
		});
	}

	render() {
		if (!this.state.isAuth) {
			return (
				<React.Fragment>
					<p>Please log in</p>
					<Login googleResponse={this.googleResponse} onFail={this.onLoginFail} clientId={googleClientId} />
				</React.Fragment>
			);
		} else {
			if (this.state.user === null || this.state.user === undefined) {
				return (
					<React.Fragment>
						<p>Unable to log in</p>
						<Logout logout={this.logout} />
					</React.Fragment>
				);
			}
			if (this.state.user.role === 1) {
				return (
					<Router>
						<div>
							<ul>
								<li><NavLink to="/">Home</NavLink></li>
								<li><NavLink to="/form">Form</NavLink></li>
								<li><NavLink to="/teams">Teams</NavLink></li>
								<li><NavLink to="/overall">Overall</NavLink></li>
								<li style={{ float: "right" }}><Logout logout={this.logout} /></li>
							</ul>

							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/form" render={() => <AllMatchForm user={this.state.user} />} />
								<Route path="/teams" component={Teams} />
								<Route path="/overall" component={OverallTable} />
								<Route component={Err404} />
							</Switch>
						</div>
					</Router>
				);
			} else if (this.state.user.role === 2) {
				return (
					<Router>
						<div>
							<ul>
								<li><NavLink to="/">Home</NavLink></li>
								<li><NavLink to="/form">Form</NavLink></li>
								<li><NavLink to="/teams">Teams</NavLink></li>
								<li><NavLink to="/overall">Overall</NavLink></li>
								<li><NavLink to="/config">Configs</NavLink></li>
								<li style={{ float: "right" }}><Logout logout={this.logout} /></li>
							</ul>

							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/form" render={() => <AllMatchForm user={this.state.user} />} />
								<Route path="/teams" component={Teams} />
								<Route path="/overall" component={OverallTable} />
								<Route path="/config" component={ConfigPage} />
								<Route component={Err404} />
							</Switch>
						</div>
					</Router>
				);
			} else {
				return (
					<Router>
						<div>
							<ul>
								<li><NavLink to="/">Home</NavLink></li>
								<li><NavLink to="/form">Form</NavLink></li>
								<li><NavLink to="/overall">Overall</NavLink></li>
								<li style={{ float: "right" }}><Logout logout={this.logout} /></li>
							</ul>

							<Switch>
								<Route exact path="/" component={Home} />
								<Route path="/form" render={() => <MatchForm user={this.state.user} />} />
								<Route path="/overall" component={OverallTable} />
								<Route component={Err404} />
							</Switch>
						</div>
					</Router>
				);
			}
		}
	}
}

const Home = () => <h2>Home</h2>;
const Loading = (props) => <div>Loading {props.page}...</div>;

const MatchForm = Loadable({
	loader: () => import("./MatchForm/MatchForm"),
	loading: Loading
});
const AllMatchForm = Loadable({
	loader: () => import("./MatchForm/AllMatchSelect"),
	loading: Loading
});

const Team = Loadable({
	loader: () => import("./TeamAnalytics/TeamAnalytics"),
	loading: Loading
});
class Teams extends React.Component {
	constructor(props) {
		super(props);
		this.match = this.props.match;
		this.state = {
			loaded: false
		}
	}
	componentDidMount() {
		fetch('/api/v1/event/getEventTeams', {
			method: 'GET'
		}).then((res) => {
			res.json().then((json) => {
				this.teamList = [];
				for(let i=0; i<json.length; i++) {
					this.teamList.push(
						<li key={json[i]}>
							<NavLink to={`${this.match.path}/${json[i]}`}>json[i]</NavLink>
						</li>
					);
					this.setState({
						loaded: true
					})
				}
			});
		});
	}
	render() {
		if(!this.state.loaded) {
			return(
				<p>Loading teams...</p>
			);
		}
		return (
			<div>
				<h2>Teams</h2>
				<ul>
					{this.teamList}
				</ul>

				<Route path={`${this.match.path}/:teamNum`} render={
					(props) => <Team {...props} />} />
				<Route exact path={match.path} render={
					() => <p>Please select a team.</p>} />
			</div>
		);
	}
}

const OverallTable = Loadable({
	loader: () => import("./OverallTable/SortableTable"),
	loading: Loading
});

const ConfigPage = Loadable({
	loader: () => import("./ConfigPage/ConfigPage"),
	loading: Loading
});

const Err404 = () => (<div>404 Error: Page not found</div>);
