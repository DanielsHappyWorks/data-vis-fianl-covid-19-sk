const Data = {
  data: undefined,

  setData: function (newData, country) {
    this.data = {
      "map": newData,
      "global": {
        "totalCases": {
          "Total Cases": Number(this.getTotal(newData, 'cases')).toLocaleString(),
          "Latest Cases": Number(this.getLatest(newData, 'cases')).toLocaleString()
        },
        "totalDeaths": {
          "Total Deaths": Number(this.getTotal(newData, 'deaths')).toLocaleString(),
          "Latest Deaths": Number(this.getLatest(newData, 'deaths')).toLocaleString(),
          "Mortality Rate": Number(this.getMortality(newData)).toLocaleString() + "%"
        },
        "continent": {
          "cases": this.getCountersPerValue(newData, 'continentName', 'cases'),
          "deaths": this.getCountersPerValue(newData, 'continentName', 'deaths')
        },
        "country": {
          "cases": this.getCountersPerValue(newData, 'countriesAndTerritories', 'cases'),
          "deaths": this.getCountersPerValue(newData, 'countriesAndTerritories', 'deaths')
        }
      },
      "country": {
        "totalCases": {
          "Total Cases": Number(this.getTotal(newData, 'cases', country)).toLocaleString(),
          "Latest Cases": Number(this.getLatest(newData, 'cases', country)).toLocaleString()
        },
        "totalDeaths": {
          "Total Deaths": Number(this.getTotal(newData, 'deaths', country)).toLocaleString(),
          "Latest Deaths": Number(this.getLatest(newData, 'deaths', country)).toLocaleString(),
          "Mortality Rate": Number(this.getMortality(newData, country)).toLocaleString() + "%"
        },
      }
    }
    console.log(this.data)
  },

  getData: function () {
    return this.data;
  },

  getThisFuckery: function (newState) {
   // var newState = oldState;
  //  newState.chartData.labels = Array.from(this.data.map.keys());
   // var deathByContinent = new Map();

   // this.data.map.forEach(element => {
   //   element.forEach(listItem => {
    //    if (deathByContinent.get(listItem.continentName) !== undefined) {
   //       deathByContinent.set(listItem.continentName, deathByContinent.get(listItem.continentName)+parseInt(listItem.deaths));
   //     } else {
   //       if(listItem.continentName==="Other")
    //        console.log(listItem)
   //       deathByContinent.set(listItem.continentName, parseInt(listItem.deaths));
   //     }
  //    });
  //  });
  //  console.log(deathByContinent);
    newState.chartData.labels = Array.from(this.data.global.continent.cases.keys());
    newState.chartData.datasets[0].data = Array.from(this.data.global.continent.cases.values());;
    return newState;
  },

  getCountersPerValue: function (data, itemToGroupBy, itemToCount) {
    var counter = new Map()
    data.forEach(element => {
      element.forEach(listItem => {
        if (counter.get(listItem[itemToGroupBy]) !== undefined) {
          counter.set(listItem[itemToGroupBy], counter.get(listItem[itemToGroupBy])+parseInt(listItem[itemToCount]));
        } else {
          if(listItem[itemToGroupBy]==="Other")
            console.log(listItem)
            counter.set(listItem[itemToGroupBy], parseInt(listItem[itemToCount]));
        }
      });
    });
    return counter;
  },

  getMortality: function (data, country) {
    var totalCases = this.getTotal(data, 'cases', country);
    var totalDeaths = this.getTotal(data, 'deaths', country);
    return totalDeaths/totalCases * 100;
  },

  getTotal: function (data, value, country) {
    var counter = 0
    data.forEach(element => {
      element.forEach(listItem => {
        if (country === undefined || country === listItem.countriesAndTerritories){
          counter += parseInt(listItem[value])
        }
      });
    });
    return counter;
  },

  getLatest: function (data, value, country) {
    var counter = 0
    data.forEach(element => {
      var mostRecentDate = new Date(1999, 1, 1);
      var mostRecentCase = 0
      element.forEach(listItem => {
        if ((mostRecentDate < new Date(parseInt(listItem.year), parseInt(listItem.month - 1), parseInt(listItem.day))) && (country === undefined || country === listItem.countriesAndTerritories)) {
          mostRecentDate = new Date(parseInt(listItem.year), parseInt(listItem.month - 1), parseInt(listItem.day));
          mostRecentCase = parseInt(listItem[value]);
        }
      });
      counter += mostRecentCase;
    });
    return counter;
  },
}

export default Data;