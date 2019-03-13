import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
	render() {
		//Chart data requires deep copying!! Data gets replaced for some bizarre reason
		return (
			<div className="chart">
				<Bar
					data={JSON.parse(JSON.stringify(this.props.chartData))}
					options={{
						title: {
							display: true,
							text: '' + this.props.title + this.props.team,
							fontSize: 25,
							fontColor: '#FFF'
						},
						legend: {
							display: true,
							position: 'bottom',
							labels: { fontColor: '#FFF' }
						},
						scales: {
							yAxes: [{ scaleLabel: {fontColor: '#FFF'} }]
						}
					}}
				/>
			</div>
		)
	}
}

export default Chart;