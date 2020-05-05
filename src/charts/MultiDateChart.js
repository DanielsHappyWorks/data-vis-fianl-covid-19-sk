import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import M from "materialize-css";


class MultiChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: "1"
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    title: 'Unset Title'
  }

  componentDidMount() {
    M.AutoInit();
  }

  handleClick() {
    var elems = document.getElementById(this.props.id + 'select');
    var instances = M.FormSelect.init(elems);
    var newSate = instances.getSelectedValues()[0];
    this.setState({
      chart: newSate,
    });
  }

  getDataAsChartData(data) {
    var chartData = {
      labels: [],
      datasets: [
        {
          backgroundColor: this.props.color,
          borderWidth: 1,
          label: "Value",
          data: [],
        }
      ]
    }
    chartData.labels = data.keys;
    chartData.datasets[0].data = data.values;

    return chartData;
  }

  getChart(chart) {
    if (chart === "1") {
      return <Bar
        data={this.getDataAsChartData(this.props.chartData)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + " - Bar Chart",
          },
          legend: {
            display: false,
            position: this.props.legendPosition
          }
        }}
      />;
    }
    else if (chart === "2") {
      return <Line
        data={this.getDataAsChartData(this.props.chartData)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + " - Line Chart",
          },
          legend: {
            display: false,
            position: this.props.legendPosition
          }
        }}
      />;
    }
    else if (chart === "3") {
      return <Bar
        data={this.getDataAsChartData(this.props.chartData)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + " - Line Chart",
          },
          legend: {
            display: false,
            position: this.props.legendPosition
          },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              type: 'logarithmic',
            }]
          }
        }}
      />;
    }
    else if (chart === "4") {
      return <Line
        data={this.getDataAsChartData(this.props.chartData)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + " - Line Chart",
          },
          legend: {
            display: false,
            position: this.props.legendPosition
          },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              type: 'logarithmic',
            }]
          }
        }}
      />;
    }
  }

  render() {
    var chart = this.getChart(this.state.chart);
    return (
      <div>
        <div className="input-field col s12">
          <select id={this.props.id + 'select'} onChange={this.handleClick.bind(this)}>
            <option value="1" defaultValue>{this.props.titleDD} - Bar Chart</option>
            <option value="2">{this.props.titleDD} - Line Chart</option>
            <option value="3">{this.props.titleDD} - Logrithmic Bar Chart</option>
            <option value="4">{this.props.titleDD} - Logrithmic Line Chart</option>
          </select>
          <label>Select Chart</label>
        </div>
        {chart}
      </div>
    )
  }
}

export default MultiChart;