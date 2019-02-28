import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import SampleImportPage from "./pages/samplePage";
import Loadable from "react-loadable";
import './App.css'; //TODO: make CSS modularized

const App = () => (
    <Router>
        <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/form" component={MatchForms} />
            <Route path="/teams" component={Teams} />
            <Route path="/overall" component={OverallTable} />
        </div>
    </Router>
);
//TODO: figure out how to implement 404 page <Route component={NoMatch} />

const Home = () => <h2>Home</h2>;
const Loading = (props) => <div>Loading {props.page}...</div>;

const MatchForm = Loadable({
    loader: () => import("./MatchForm/MatchForm"),
    loading: Loading
});
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
            (props) => <MatchForm {...props}/>} />
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

const Header = () => (
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/form">Form</NavLink></li>
        <li><NavLink to="/teams">Teams</NavLink></li>
        <li><NavLink to="/sample">Sample</NavLink></li>
        <li><NavLink to="/overall">Overall</NavLink></li>
    </ul>
);
const NoMatch = () => (<div>404 Error: Page not found</div>);

export default App;
