import React, { Component } from 'react';

//comment
import CalcAnalytics from './CalcAnalytics/CalcAnalytics';
import CreateEvent from './CreateEvent/CreateEvent';
import CurEvent from './CurEvent/CurEvent';
import CreateForm from './CreateForm/CreateForm';
import GenerateUsers from './GenerateUsers/GenerateUsers';
import BlueSide from './BlueSide/BlueSide';
const None = () => <p>Choose a setting</p>;

export default class ConfigPage extends Component {
	constructor(props) {
		super(props);
		this.displayConfig = this.displayConfig.bind(this);
		this.configList = {
			calcAnalytics: {
				component: CalcAnalytics,
				label: 'Calculate analytics'
			},
			createEvent: {
				component: CreateEvent,
				label: 'Create event'
			},
			curEvent: {
				component: CurEvent,
				label: 'Set current event'
			},
			createForm: {
				component: CreateForm,
				label: 'Create temporary form'
			},
			generateUsers: {
				component: GenerateUsers,
				label: 'Generate users'
			},
			blueSide: {
				component: BlueSide,
				label: 'Set blue side'
			}
		};
		this.state = { config: 'none' };
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	displayConfig(config) {
		this.setState({ config: config });
	}
	render() {
		const inactiveClass = 'btn-link';
		const activeClass = 'btn-link active';
		const viewBtns = [];
		for (let config of Object.keys(this.configList)) {
			viewBtns.push(
				<li key={config}>
					<button
						className={config === this.state.config ? activeClass : inactiveClass}
						onClick={() => this.displayConfig(config)}
					>
						{this.configList[config].label}
					</button>
				</li>
			);
		}
		const Config = this.state.config === 'none' ? None : this.configList[this.state.config].component;
		return (
			<div style={{ marginTop: '10px' }}>
				<ul>{viewBtns}</ul>
				<Config user={this.props.user} />
			</div>
		);
	}
}
