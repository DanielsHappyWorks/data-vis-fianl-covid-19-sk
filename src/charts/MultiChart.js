import React, { Component } from 'react';
import { Pie, Bar, Line, Polar, Doughnut } from 'react-chartjs-2';
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

  getDataAsChartData(data, limit) {
    var chartData = {
      labels: [],
      datasets: [
        {
          label: "Value",
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 90, 0.6)',
            'rgba(100, 162, 235, 0.6)',
            'rgba(255, 150, 86, 0.6)'
          ]
        }
      ]
    }
    chartData.labels = Array.from(data.keys()).map(function (x) { return x.replace(/_/g, ' '); });
    chartData.datasets[0].data = Array.from(data.values());


    var list = [];
    for (var j = 0; j < chartData.labels.length; j++)
      list.push({ 'key': chartData.labels[j], 'value': chartData.datasets[0].data[j] });

    list.sort(function (a, b) {
      return b.value - a.value;
    });

    for (var k = 0; k < list.length; k++) {
      chartData.labels[k] = list[k].key;
      chartData.datasets[0].data[k] = list[k].value;
    }

    if (limit) {
      chartData.labels = chartData.labels.slice(0, limit);
      chartData.datasets[0].data = chartData.datasets[0].data.slice(0, limit);
    }

    return chartData;
  }

  getChart(chart) {
    if (chart === "1") {
      return <Bar
        data={this.getDataAsChartData(this.props.chartData, this.props.limit)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + "- Bar Chart",
          },
          legend: {
            display: false,
            position: this.props.legendPosition
          }
        }}
      />;
    }
    else if (chart === "2") {
      return <Pie
        data={this.getDataAsChartData(this.props.chartData, this.props.limit)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + "- Pie Chart",
          },
          legend: {
            display: this.props.displayLegend,
            position: this.props.legendPosition
          }
        }}
      />;
    }
    else if (chart === "3") {
      return <Doughnut
        data={this.getDataAsChartData(this.props.chartData, this.props.limit)}
        options={{
          cutoutPercentage: 50,
          title: {
            display: this.props.displayTitle,
            text: this.props.title + "- Doughnut Chart",
          },
          legend: {
            display: this.props.displayLegend,
            position: this.props.legendPosition
          }
        }}
      />;
    }
    else if (chart === "4") {
      return <Polar
        data={this.getDataAsChartData(this.props.chartData, this.props.limit)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + "- Polar Chart",
          },
          legend: {
            display: this.props.displayLegend,
            position: this.props.legendPosition
          }
        }}
      />;
    }
    else if (chart === "5") {
      return <Line
        data={this.getDataAsChartData(this.props.chartData, this.props.limit)}
        options={{
          title: {
            display: this.props.displayTitle,
            text: this.props.title + "- Line Chart",
          },
          legend: {
            display: false,
            position: this.props.legendPosition
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
            <option value="1" defaultValue>{this.props.title}- Bar Chart</option>
            <option value="2">{this.props.title} - Pie Chart</option>
            <option value="3">{this.props.title} - Doughnut Chart</option>
            <option value="4">{this.props.title} - Polar Chart</option>
            <option value="5">{this.props.title} - Line Chart</option>
          </select>
          <label>Select Chart</label>
        </div>
        {chart}
      </div>
    )
  }
}

export default MultiChart;