import React, { Component } from 'react';
import M from "materialize-css";
import PieChart from '../../charts/PieChart';
import LineChart from '../../charts/LineChart';
import BarChart from '../../charts/BarChart';
import DataProcessor from '../../_data/DataProcessor'
import InfoCardRow from '../widget/InfoCardRow/InfoCardRow'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Death My Boi',
            data: [],
            backgroundColor: [
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
    }
    DataProcessor.setData(this.props.dataMap);
    this.state = DataProcessor.getThisFuckery(this.state);
    this.state["data"] = DataProcessor.getData();
  }

  getThisFuckery(dataMap, oldState) {
    console.log(Array.from(dataMap.keys()))
    var newState = oldState;
    newState.chartData.labels = Array.from(dataMap.keys());
    var deathCounter = []
    dataMap.forEach(element => {
      var deathCounterPerItem = 0;
      element.forEach(listItem => {
        deathCounterPerItem += parseInt(listItem.deaths)
      });
      deathCounter.push(deathCounterPerItem);
    });
    console.log(deathCounter);
    newState.chartData.datasets[0].data = deathCounter;
    console.log(newState);
    return newState;
  }

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  render() {
    this.cards = {
      "Total Cases": 468451,
      "Current Cases": 4845,
      "Recoveries": 845,
      "Deaths": 48565
  }
    return (
      <main>
        <div class="container">
          
          <h3 class="header">Global Data</h3>
          <blockquote>
            This is an example quotation that uses the blockquote tag.
          </blockquote>
          <InfoCardRow columns="col s12 m6 l6 xl3" cards={this.state.data.global.totals} />
          
          <PieChart chartData={this.state.chartData} location="pie" legendPosition="bottom" />
          <BarChart chartData={this.state.chartData} location="bar" legendPosition="bottom" />
          <LineChart chartData={this.state.chartData} location="line" legendPosition="bottom" />
        </div>
      </main >
    )
  }
}

export default Dashboard;