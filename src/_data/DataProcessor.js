const Data = {
  data: undefined,

  setData: function (newData, country) {
    this.data = {
      "map": newData,
      "global": {
        "totalCases": {
          "Total Cases": Number(this.getTotal(newData, 'cases')).toLocaleString(),
          "Recent Cases": Number(this.getLatest(newData, 'cases')).toLocaleString()
        },
        "totalDeaths": {
          "Total Deaths": Number(this.getTotal(newData, 'deaths')).toLocaleString(),
          "Recent Deaths": Number(this.getLatest(newData, 'deaths')).toLocaleString(),
          "Mortality Rate": Number(this.getMortality(newData)).toLocaleString() + "%"
        },
        "worldMapData": this.getWorldMapData(newData),
        "continent": {
          "cases": this.getCountersPerValue(newData, 'continentName', 'cases'),
          "deaths": this.getCountersPerValue(newData, 'continentName', 'deaths'),
          "recentCases": this.getCountersPerValueLatest(newData, 'continentName', 'cases'),
          "recentDeaths": this.getCountersPerValueLatest(newData, 'continentName', 'deaths')
        },
        "country": {
          "cases": this.getCountersPerValue(newData, 'countriesAndTerritories', 'cases'),
          "deaths": this.getCountersPerValue(newData, 'countriesAndTerritories', 'deaths'),
          "recentCases": this.getCountersPerValueLatest(newData, 'countriesAndTerritories', 'cases'),
          "recentDeaths": this.getCountersPerValueLatest(newData, 'countriesAndTerritories', 'deaths')
        }
      },
      "country": {
        "totalCases": {
          "Total Cases": Number(this.getTotal(newData, 'cases', country)).toLocaleString(),
          "Recent Cases": Number(this.getLatest(newData, 'cases', country)).toLocaleString()
        },
        "totalDeaths": {
          "Total Deaths": Number(this.getTotal(newData, 'deaths', country)).toLocaleString(),
          "Recent Deaths": Number(this.getLatest(newData, 'deaths', country)).toLocaleString(),
          "Mortality Rate": Number(this.getMortality(newData, country)).toLocaleString() + "%"
        },
        "cumulative": {
          "cases": this.getCumulative(this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'cases', country))),
          "deaths": this.getCumulative(this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'deaths', country))),
        },
        "daily": {
          "cases": this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'cases', country)),
          "deaths": this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'deaths', country)),
        }
      }
    }
  },

  getData: function () {
    return this.data;
  },

  updateDashboardState: function (newState) {
    newState.chartData.labels = Array.from(this.data.global.continent.cases.keys());
    newState.chartData.datasets[0].data = Array.from(this.data.global.continent.cases.values());;
    return newState;
  },

  getCountersPerValue: function (data, itemToGroupBy, itemToCount, country) {
    var counter = new Map()
    data.forEach(element => {
      element.forEach(listItem => {
        if ((country === undefined || country === listItem.countriesAndTerritories)) {
          if (counter.get(listItem[itemToGroupBy]) !== undefined) {
            counter.set(listItem[itemToGroupBy], counter.get(listItem[itemToGroupBy]) + parseInt(listItem[itemToCount]));
          } else {
            counter.set(listItem[itemToGroupBy], parseInt(listItem[itemToCount]));
          }
        }
      });
    });
    return counter;
  },

  sortByData: function (valMap) {
    var keys = Array.from(valMap.keys()).reverse();
    var values = Array.from(valMap.values()).reverse();

    return {
      keys: keys,
      values: values,
    };
  },

  getCumulative: function (valMap) {
    var cumulativeValue = 0;
    valMap.values.forEach((value, key) => {
      cumulativeValue = cumulativeValue + value;
      valMap.values[key] = cumulativeValue;
    });
    return {
      keys: valMap.keys,
      values: valMap.values,
    };
  },

  getCountersPerValueLatest: function (data, itemToCount, value) {
    var counter = new Map()
    var mostRecentDate = new Date(1999, 1, 1);
    data.forEach(element => {
      element.forEach(listItem => {
        if (mostRecentDate < new Date(parseInt(listItem.year), parseInt(listItem.month - 1), parseInt(listItem.day))) {
          mostRecentDate = new Date(parseInt(listItem.year), parseInt(listItem.month - 1), parseInt(listItem.day));
          counter.set(listItem[itemToCount], parseInt(listItem[value]));
        } else if (mostRecentDate.getTime() === new Date(parseInt(listItem.year), parseInt(listItem.month - 1), parseInt(listItem.day)).getTime()) {
          if (counter.get(listItem[itemToCount]) !== undefined) {
            counter.set(listItem[itemToCount], counter.get(listItem[itemToCount]) + parseInt(listItem[value]));
          } else {
            counter.set(listItem[itemToCount], parseInt(listItem[value]));
          }
        }
      });
    });
    return counter;
  },

  getWorldMapData: function (data) {
    var cases = this.getCountersPerValue(data, 'countriesAndTerritories', 'cases');
    var deaths = this.getCountersPerValue(data, 'countriesAndTerritories', 'deaths');
    var recentCases = this.getCountersPerValueLatest(data, 'countriesAndTerritories', 'cases');
    var deathsCases = this.getCountersPerValueLatest(data, 'countriesAndTerritories', 'deaths');
    var worldData = []
    var totalCasesTracker = [];
    var totalDeathsTracker = [];
    var recentCasesTracker = [];
    var recentDeathsTracker = [];
    data.forEach(element => {
      var transformedElem = {};
      transformedElem.country = element[0].countriesAndTerritories;
      transformedElem.latLong = [element[0].latitude, element[0].longitude];
      transformedElem.totalCases = cases.get(element[0].countriesAndTerritories)
      totalCasesTracker.push(transformedElem.totalCases);
      transformedElem.totalDeaths = deaths.get(element[0].countriesAndTerritories)
      totalDeathsTracker.push(transformedElem.totalDeaths);
      transformedElem.recentCases = recentCases.get(element[0].countriesAndTerritories)
      recentCasesTracker.push(transformedElem.recentCases);
      transformedElem.recentDeaths = deathsCases.get(element[0].countriesAndTerritories)
      recentDeathsTracker.push(transformedElem.recentDeaths);
      worldData.push(transformedElem)
    });
    worldData.forEach(element => {
      element.totalCasesMinMax = this.normalizeBetweenTwoRanges(element.totalCases, Math.min.apply(null, totalCasesTracker), Math.max.apply(null, totalCasesTracker), 5, 100);
      element.totalDeathsMinMax = this.normalizeBetweenTwoRanges(element.totalDeaths, Math.min.apply(null, totalDeathsTracker), Math.max.apply(null, totalDeathsTracker), 5, 100);
      element.recentCasesMinMax = this.normalizeBetweenTwoRanges(element.recentCases, Math.min.apply(null, recentCasesTracker), Math.max.apply(null, recentCasesTracker), 5, 100);
      element.recentDeathsMinMax = this.normalizeBetweenTwoRanges(element.recentDeaths, Math.min.apply(null, recentDeathsTracker), Math.max.apply(null, recentDeathsTracker), 5, 100);
    })
    return worldData;
  },

  normalizeBetweenTwoRanges: function (val, minVal, maxVal, newMin, newMax) {
    return newMin + (val - minVal) * (newMax - newMin) / (maxVal - minVal);
  },

  getMortality: function (data, country) {
    var totalCases = this.getTotal(data, 'cases', country);
    var totalDeaths = this.getTotal(data, 'deaths', country);
    return totalDeaths / totalCases * 100;
  },

  getTotal: function (data, value, country) {
    var counter = 0
    data.forEach(element => {
      element.forEach(listItem => {
        if (country === undefined || country === listItem.countriesAndTerritories) {
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