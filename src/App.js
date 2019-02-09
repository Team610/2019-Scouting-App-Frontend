import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import SampleImportPage from "./pages/samplePage";
import Loadable from "react-loadable";
import './App.css';

const App = () => (
    <Router>
        <div>
            <Header />

            <Route exact path="/" component={Home} />
            <Route path="/form" component={MatchForms} />
            <Route path="/teams" component={Teams} />
            <Route path="/sample" component={LoadableSamplePage} />
        </div>
    </Router>
);
//TODO: figure out how to implement 404 page <Route component={NoMatch} />

const Home = () => <h2>Home</h2>;
const Loading = (props) => <div>Loading {props.page}...</div>;

const MatchForm = Loadable({
    loader: () => import("./pages/matchForm"),
    loading: Loading
});
const MatchForms = ({ match }) => (
    <div>
        <h2>Forms</h2>
        <ul>
            <li><NavLink to={`${match.url}/1`}>Match 1</NavLink></li>
            <li><NavLink to={`${match.url}/2`}>Match 2</NavLink></li>
            <li><NavLink to={`${match.url}/3`}>Match 3</NavLink></li>
        </ul>

        <Route path={`${match.path}/:matchId`} render={
            (props) => <MatchForm {...props}/>} />
        <Route exact path={match.path} render={
            () => <p>Please select a match number.</p>} />
    </div>
);

const Team = Loadable({
    loader: () => import("./pages/team"),
    loading: Loading
});
const Teams = ({ match }) => (
    <div>
        <h2>Teams</h2>
        <ul>
            <li><NavLink to={`${match.url}/610`}>610</NavLink></li>
            <li><NavLink to={`${match.url}/254`}>254</NavLink></li>
        </ul>

        <Route path={`${match.path}/:teamNum`} render={
            (props) => <Team {...props} />} />
        <Route exact path={match.path} render={
            () => <p>Please select a team.</p>} />
    </div>
);

const Header = () => (
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/form">Form</NavLink></li>
        <li><NavLink to="/teams">Teams</NavLink></li>
        <li><NavLink to="/sample">Sample</NavLink></li>
    </ul>
);
const NoMatch = () => (<div>404 Error: Page not found</div>);

const LoadableSamplePage = Loadable({
    loader: () => import("./pages/samplePage"),
    loading: Loading
});

export default App;
