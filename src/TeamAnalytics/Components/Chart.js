import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { isEqual } from './Util';

export default class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: JSON.parse(JSON.stringify(this.props.chartData))
		};
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	componentDidUpdate(prevProps) {
		if (!isEqual(prevProps.chartData, this.props.chartData) && this._isMounted)
			this.setState({ data: JSON.parse(JSON.stringify(this.props.chartData)) });
	}
	render() {
		//Chart data requires deep copying!! Data gets replaced for some bizarre reason
		return (
			<div className="chart" style={{ width: '90vw', backgroundColor: '#EEE', marginLeft: '10px', paddingLeft:'10px' }}>
				<Bar
					data={this.state.data}
					options={{
						title: {
							display: true,
							text: '' + this.props.title + this.props.team,
							fontSize: 25,
							fontColor: '#111'
						},
						legend: {
							display: true,
							position: 'bottom',
							labels: { fontColor: '#111' }
						},
						scales: {
							yAxes: [{
								scaleLabel: { fontColor: '#111' },
								ticks: {
									beginAtZero: true,
									stepSize: 0.5
								},
								stacked: !!this.state.data.stacked
							}],
							xAxes: [{
								stacked: !!this.state.data.stacked
							}]
						}
					}}
				/>
			</div>
		);
	}
}
