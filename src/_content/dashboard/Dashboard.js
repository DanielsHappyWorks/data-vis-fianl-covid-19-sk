import React, { Component } from 'react';
import M from "materialize-css";
import MapChart from '../../charts/MapChart';
import MultiChart from '../../charts/MultiChart';
import MultiDateChart from '../../charts/MultiDateChart';
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
    console.log(newState);
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
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Total Cases Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_cases_chart_map" chartData={this.state.data.global.continent.cases} title="Total Cases Per Continent" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Total Deaths Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_deaths_chart_map" chartData={this.state.data.global.continent.deaths} title="Total Deaths Per Continent" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Recent Cases Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_cases_chart_map" chartData={this.state.data.global.continent.recentCases} title="Recent Cases Per Continent" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Recent Deaths Per Continent</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_deaths_chart_map" chartData={this.state.data.global.continent.recentDeaths} title="Recent Deaths Per Continent" legendPosition="bottom" /></div>
                </li>
              </ul>
            </div>
            <div className={this.state.col.two}>
              <ul className="collapsible">
                <li className="active">
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>10 Countries With Highest Total Cases</div>
                  <div className="collapsible-body"><MultiChart id="world_deaths_chart_map_country" chartData={this.state.data.global.country.cases} limit={10} title="10 Countries With Highest Total Cases" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>10 Countries With Highest Total Deaths</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_cases_chart_map_country" chartData={this.state.data.global.country.deaths} limit={10} title="10 Countries With Highest Total Deaths" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>10 Countries With Highest Recent Cases</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_deaths_chart_map_country" chartData={this.state.data.global.country.recentCases} limit={10} title="10 Countries With Highest Recent Cases" legendPosition="bottom" /></div>
                </li>
                <li className="">
                  <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>10 Countries With Highest Recent Deaths</div>
                  <div className="collapsible-body"><MultiChart id="world_recent_deaths_chart_map_country" chartData={this.state.data.global.country.recentDeaths} limit={10} title="10 Countries With Highest Recent Deaths" legendPosition="bottom" /></div>
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
            <InfoCardRow columns={this.state.col.two} cards={this.state.data.country.totalCases} />
            <InfoCardRow columns={this.state.col.three} cards={this.state.data.country.totalDeaths} />
          </div >
          <div className={this.state.col.one}>
            <ul className="collapsible">
              <li className="active">
                <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Cumulative Cases over time for {this.state.country.replace(/_/g, " ")}</div>
                <div className="collapsible-body"><MultiDateChart id="country_cumulative_cases" color='rgba(43,177,26, 0.6)' chartData={this.state.data.country.cumulative.cases} titleDD="Cumulative Cases" title={"Cumulative Cases (" + this.state.country.replace(/_/g, " ") + ")"} legendPosition="bottom" /></div>
              </li>
              <li className="">
                <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Cumulative Deaths over time for {this.state.country.replace(/_/g, " ")}</div>
                <div className="collapsible-body"><MultiDateChart id="country_cumulative_deaths" color='rgba(205,175,28, 0.6)' chartData={this.state.data.country.cumulative.deaths} titleDD="Cumulative Deaths" title={"Cumulative Deaths (" + this.state.country.replace(/_/g, " ") + ")"} legendPosition="bottom" /></div>
              </li>
              <li className="">
                <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Daily Cases for {this.state.country.replace(/_/g, " ")}</div>
                <div className="collapsible-body"><MultiDateChart id="country_daily_cases" color='rgba(28,142,205, 0.6)' chartData={this.state.data.country.daily.cases} titleDD="Daily Cases" title={"Daily Cases (" + this.state.country.replace(/_/g, " ") + ")"} legendPosition="bottom" /></div>
              </li>
              <li className="">
                <div className="collapsible-header"><i className="material-icons">arrow_drop_down</i>Daily Deaths for {this.state.country.replace(/_/g, " ")}</div>
                <div className="collapsible-body"><MultiDateChart id="country_daily_deaths" color='rgba(199,0,57, 0.6)' chartData={this.state.data.country.daily.cases} titleDD="Daily Deaths" title={"Daily Deaths (" + this.state.country.replace(/_/g, " ") + ")"} legendPosition="bottom" /></div>
              </li>
            </ul>
          </div>
        </div>
      </main >
    )
  }
}

export default Dashboard;