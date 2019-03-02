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
					console.log(`role: ${user.role}`);
					this.setState({
						user: user,
						isAuth: true
					});
				} else if (user.role >= 0) {
					this.setState({
						user: user,
						isAuth: true
					})
				} else {
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
			if (this.state.user === null) {
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
								<Route path="/form" component={AllMatchForm} />
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
								<Route path="/form" component={AllMatchForm} />
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
								<Route path="/form" component={MatchForm} />
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
const AllMatchForm = () => <p>WIP all match forms</p>;

const MatchForms = ({ match }) => (
	<div>
		<h2>Forms</h2>
		<ul>
			<li><NavLink to={`${match.url}/1`}>Match 1</NavLink></li>
			<li><NavLink to={`${match.url}/2`}>Match 2</NavLink></li>
			<li><NavLink to={`${match.url}/3`}>Match 3</NavLink></li>
			<li><NavLink to={`${match.url}/4`}>Match 4</NavLink></li>
			<li><NavLink to={`${match.url}/5`}>Match 5</NavLink></li>
			<li><NavLink to={`${match.url}/6`}>Match 6</NavLink></li>
			<li><NavLink to={`${match.url}/7`}>Match 7</NavLink></li>
			<li><NavLink to={`${match.url}/8`}>Match 8</NavLink></li>
			<li><NavLink to={`${match.url}/9`}>Match 9</NavLink></li>
			<li><NavLink to={`${match.url}/10`}>Match 10</NavLink></li>
			<li><NavLink to={`${match.url}/11`}>Match 11</NavLink></li>
			<li><NavLink to={`${match.url}/12`}>Match 12</NavLink></li>
			<li><NavLink to={`${match.url}/13`}>Match 13</NavLink></li>
		</ul>

		<Route path={`${match.path}/:matchId`} render={
			(props) => <MatchForm {...props} />} />
		<Route exact path={match.path} render={
			() => <p>Please select a match number.</p>} />
	</div>
);

const Team = Loadable({
	loader: () => import("./TeamAnalytics/TeamAnalytics"),
	loading: Loading
});
const Teams = ({ match }) => (
	<div>
		<h2>Teams</h2>
		<ul>
			<li><NavLink to={`${match.url}/610`}>610</NavLink></li>
			<li><NavLink to={`${match.url}/33`}>33</NavLink></li>
		</ul>

		<p>TODO: make the team list dynamic!!</p>
		<Route path={`${match.path}/:teamNum`} render={
			(props) => <Team {...props} />} />
		<Route exact path={match.path} render={
			() => <p>Please select a team.</p>} />
	</div>
);

const OverallTable = Loadable({
	loader: () => import("./OverallTable/SortableTable"),
	loading: Loading
});

const ConfigPage = Loadable({
	loader: () => import("./ConfigPage/ConfigPage"),
	loading: Loading
});

const Err404 = () => (<div>404 Error: Page not found</div>);
