import React, { Component } from 'react';
import M from "materialize-css";
import MapChart from '../../charts/MapChart';
import MultiChart from '../../charts/MultiChart';
import LineChart from '../../charts/LineChart';
import BarChart from '../../charts/BarChart';
import DataProcessor from '../../_data/DataProcessor'
import InfoCardRow from '../widget/InfoCardRow/InfoCardRow'


class Dashboard extends Component {
  constructor(props) {
    super(props);

    var params = (new URL(document.location)).searchParams;
    var name = params.get("country");
    var country = Array.from(this.props.dataMap.keys()).includes(name) ? name : "South_Korea";

    this.state = this.createState(country);
  }

  createState(country) {
    var countriesForAutoComplete = Object.fromEntries(this.props.dataMap);
    Object.keys(countriesForAutoComplete).forEach(k => countriesForAutoComplete[k] = null)

    var newState = {
      countries: Array.from(this.props.dataMap.keys()),
      countriesForAutoComplete: countriesForAutoComplete,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Cases',
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

    newState["country"] = country;

    DataProcessor.setData(this.props.dataMap, country);
    newState["data"] = DataProcessor.getData();
    newState["col"] = {
      "two": "col s12 m12 l6",
      "three": "col s12 m6 l4",
      "four": "col s12 m6 l3",
      "five": "col s12 m6 l2"
    }
    return newState;
  }

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();

    var elem = document.querySelector('.collapsible.expandable');
    M.Collapsible.init(elem, {
      accordion: false
    });

    var elems = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elems, {
      data: this.state.countriesForAutoComplete,
      onAutocomplete: function (wat) {
        DataProcessor.setData(this.props.dataMap, wat);
        this.setState(this.createState(wat));
      }.bind(this)
    });
  }

  initMaterialise() {
    M.AutoInit();

    var elem = document.querySelector('.collapsible.expandable');
    M.Collapsible.init(elem, {
      accordion: false
    });

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.autocomplete');
      M.Autocomplete.init(elems, {
        data: this.state.countriesForAutoComplete,
        onAutocomplete: function (wat) {
          DataProcessor.setData(this.props.dataMap, wat);
          this.setState(this.createState(wat));
        }.bind(this)
      });
    }.bind(this));
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
    chartData.labels = Array.from(data.keys()).map(function(x){return x.replace(/_/g, ' ');});
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

  render() {
    this.cards = {
      "Total Cases": 468451,
      "Current Cases": 4845,
      "Recoveries": 845,
      "Deaths": 48565
    }
    return (
      <main>
        <div className="container">

          <h3 className="header">Global Data</h3>
          <blockquote>
            Shows the global data for Covid-19
          </blockquote>
          <div className="row">
            <InfoCardRow columns={this.state.col.two} cards={this.state.data.global.totalCases} />
            <InfoCardRow columns={this.state.col.three} cards={this.state.data.global.totalDeaths} />
            <div className={this.state.col.one}>
              <ul className="collapsible expandable">
                <li className="active">
                  <div className="collapsible-header"><i className="material-icons">filter_drama</i>World Map</div>
                  <div className="collapsible-body"><MapChart chartData={this.state.data.global.worldMapData} /></div>
                </li>
              </ul>
            </div>
            <div className={this.state.col.two}>
              <ul className="collapsible">
                <li className="active">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>Total Cases Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_cases_chart_map" chartData={this.getDataAsChartData(this.state.data.global.continent.cases)} title="Total Cases Per Continent" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>Total Deaths Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_deaths_chart_map" chartData={this.getDataAsChartData(this.state.data.global.continent.deaths)} title="Total Deaths Per Continent" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>Recent Cases Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_cases_chart_map" chartData={this.getDataAsChartData(this.state.data.global.continent.recentCases)} title="Recent Cases Per Continent" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>Recent Deaths Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_deaths_chart_map" chartData={this.getDataAsChartData(this.state.data.global.continent.recentDeaths)} title="Recent Deaths Per Continent" legendPosition="bottom" /></div>
                </li>
              </ul>
            </div>
            <div className={this.state.col.two}>
              <ul className="collapsible">
                <li className="active">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>10 Countries With Highest Total Cases</div>
                  <div className="collapsible-body"><MultiChart id="world_deaths_chart_map_country" chartData={this.getDataAsChartData(this.state.data.global.country.cases, 10)} title="10 Countries With Highest Total Cases" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>10 Countries With Highest Total Deaths</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_cases_chart_map_country" chartData={this.getDataAsChartData(this.state.data.global.country.deaths, 10)} title="10 Countries With Highest Total Deaths" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>10 Countries With Highest Recent Cases</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_deaths_chart_map_country" chartData={this.getDataAsChartData(this.state.data.global.country.recentCases, 10)} title="10 Countries With Highest Recent Cases" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">pie_chart_outlined</i>10 Countries With Highest Recent Deaths</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_deaths_chart_map_country" chartData={this.getDataAsChartData(this.state.data.global.country.recentDeaths, 10)} title="10 Countries With Highest Recent Deaths" legendPosition="bottom" /></div>
                </li>
              </ul>
            </div>
          </div>
          <h3 className="header">Country Data: {this.state.country.replace(/_/g, " ")}</h3>
          <blockquote>
            Shows the data for {this.state.country.replace(/_/g, " ")} on Covid-19
          </blockquote>
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">textsms</i>
                  <input type="text" id="autocomplete-input" className="autocomplete" />
                  <label htmlFor="autocomplete-input">Autocomplete</label>
                </div>
              </div>
            </div>
          </div>
          <InfoCardRow columns={this.state.col.two} cards={this.state.data.country.totalCases} />
          <InfoCardRow columns={this.state.col.three} cards={this.state.data.country.totalDeaths} />
        </div >
      </main >
    )
  }
}

export default Dashboard;