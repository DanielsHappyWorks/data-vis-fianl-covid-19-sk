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

    var params = (new URL(document.location)).searchParams;
    var name = params.get("country");
    var country = Array.from(this.props.dataMap.keys()).includes(name) ? name : "South_Korea";

    this.state = this.createState(country);
    console.log("Frist state ", this.state);
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

    newState["country"] = country;

    DataProcessor.setData(this.props.dataMap, country);
    newState = DataProcessor.getThisFuckery(newState);
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
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.autocomplete');
      var instances = M.Autocomplete.init(elems, {
        data: this.state.countriesForAutoComplete,
        onAutocomplete: function (wat) {
          console.log(wat);
          DataProcessor.setData(this.props.dataMap, wat);
          this.setState(this.createState(wat));
        }.bind(this)
      });
      console.log("WTF mutch ", this.state.countries)
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
        <div class="container">

          <h3 class="header">Global Data</h3>
          <blockquote>
            This is an example quotation that uses the blockquote tag.
          </blockquote>
          <div class="row">
            <InfoCardRow columns={this.state.col.two} cards={this.state.data.global.totalCases} />
            <InfoCardRow columns={this.state.col.three} cards={this.state.data.global.totalDeaths} />
            <div class={this.state.col.two}>
              <ul class="collapsible expandable">
                <li class="active">
                  <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
                  <div class="collapsible-body"><LineChart chartData={this.state.chartData} location="line" legendPosition="bottom" /></div>
                </li>
              </ul></div>
            <div class={this.state.col.two}>
              <ul class="collapsible expandable">
                <li>
                  <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
                  <div class="collapsible-body"><BarChart chartData={this.state.chartData} location="bar" legendPosition="bottom" /></div>
                </li>
              </ul></div>
            <div class={this.state.col.two}>
              <ul class="collapsible expandable">
                <li>
                  <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
                  <div class="collapsible-body"><PieChart chartData={this.state.chartData} location="pie" legendPosition="bottom" /></div>
                </li>
              </ul></div>
          </div>
          <h3 class="header">Country Data: {this.state.country}</h3>
          <blockquote>
            This is an example quotation that uses the blockquote tag.
          </blockquote>
          <div class="row">
            <div class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">textsms</i>
                  <input type="text" id="autocomplete-input" class="autocomplete" />
                  <label for="autocomplete-input">Autocomplete</label>
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