import React, { Component } from 'react';
import { Pie, Bar, Line, Polar, Doughnut } from 'react-chartjs-2';
import M from "materialize-css";


class MultiChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
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

  getChart(chart) {
    if (chart === "1") {
      return <Bar
        data={this.state.chartData}
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
        data={this.state.chartData}
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
        data={this.state.chartData}
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
        data={this.state.chartData}
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
        data={this.state.chartData}
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