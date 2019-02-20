import React, { Component } from 'react';
import TeamAnalyticsHeader from './TeamAnalyticsHeader/teamAnalyticsHeader';
import OverallSection from './OverallSection/overallSection';
import CyclesSection from './CyclesSection/cyclesSection';
import PreGameSection from './PreGameSection/preGameSection';
import EndGameSection from './EndGameSection/endGameSection';
import DefenseSection from './DefenseSection/defenseSection';
import CommentsSection from './CommentsSection/commentsSection';
import Chart from './ChartJS/Chart';
import './style.css';

class Team extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataAvailable:false,
			charData:{}
		}
		this.teamNum = this.props.match.params.teamNum
	}

	componentWillMount(){
		this.getChartData();
	}

	getChartData(){
		let txt = '{"33":{"1":{"def_tough_defense":[],"robot_preload":["cargo"],"cargo_lv3":[],"def_driving_around":[],"def_ship_goalkeep":[],"start_on_lvl_2":["true"],"comments":["undefined"],"climb_lvl":["1"],"hatch_lv1":[],"hatch_lv2":[1.104],"hatch_lvS":[],"climb_time":["0"],"hatch_lv3":[],"cargo_lvS":[],"def_rocket_goalkeep":[],"ship_preloads":["cargo","hatch"],"cargo_lv2":[],"cargo_lv1":[],"def_pinning":[1.096]}}}';
		let obj = JSON.parse(txt);
		console.log(obj[33]);
		this.setState({
      chartData:{
        labels: [],
        datasets:[
          {
            label:'Population',
            data:[
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }

	async componentWillMount() {
		let data = await fetch(`/api/v1/stats/team/${this.teamNum}/agg`);
		data = await data.json();
		this.setState({
			dataAvailable: true,
			data: data[this.teamNum]
		});
	}
    render() {
		console.log(this.state.data);
		return (
      <div className="App">
        <div className="App-header">
        </div>
        <Chart chartData={this.state.chartData} location="33" legendPosition="bottom"/>
      </div>
    );
		if(!this.state.dataAvailable) {
			return(
				<div>
					<TeamAnalyticsHeader num={this.teamNum} />
					<p>Data loading...</p>
				</div>
			);
		}
    return (
      <div>
				<TeamAnalyticsHeader teamNum={this.teamNum} />
				<OverallSection data={this.state.data} />
				<CyclesSection data={this.state.data} />
				<PreGameSection data={this.state.data} />
				<EndGameSection data={this.state.data} />
				<DefenseSection data={this.state.data} />
				<CommentsSection />
      </div>
    );
	}
}

export default Team;
