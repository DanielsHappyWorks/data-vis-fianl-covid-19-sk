const Data = {
  data: undefined,

  setData: function (newData, countries) {
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
          "Total Cases": Number(this.getTotal(newData, 'cases', countries)).toLocaleString(),
          "Recent Cases": Number(this.getLatest(newData, 'cases', countries)).toLocaleString()
        },
        "totalDeaths": {
          "Total Deaths": Number(this.getTotal(newData, 'deaths', countries)).toLocaleString(),
          "Recent Deaths": Number(this.getLatest(newData, 'deaths', countries)).toLocaleString(),
          "Mortality Rate": Number(this.getMortality(newData, countries)).toLocaleString() + "%"
        },
        "cumulative": {
          "cases": this.getCumulative(this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'cases', countries))),
          "deaths": this.getCumulative(this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'deaths', countries))),
        },
        "daily": {
          "cases": this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'cases', countries)),
          "deaths": this.sortByData(this.getCountersPerValue(newData, 'dateRep', 'deaths', countries)),
        }
      }
    }
    console.log(this.data)
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
        if ((country === undefined || country.includes(listItem.countriesAndTerritories))) {
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
    var keys = Array.from(valMap.keys());
    var values = Array.from(valMap.values());

    var kvAsObj = []
    keys.forEach((key, i) => kvAsObj[i] = {key: key, value: values[i]});

    kvAsObj.sort(function(a,b){
      var aAsDataVals = a.key.split("/");
      var bAsDataVals = b.key.split("/");
      return new Date(aAsDataVals[2], aAsDataVals[1] - 1, aAsDataVals[0]) - new Date(bAsDataVals[2], bAsDataVals[1] - 1, bAsDataVals[0]);
    });

    return {
      keys: kvAsObj.map(function(i) {
        return i.key;
      }),
      values: kvAsObj.map(function(i) {
        return i.value;
      }),
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
      if(!transformedElem.totalCases)
        transformedElem.totalCases = 0;
      totalCasesTracker.push(transformedElem.totalCases);
      transformedElem.totalDeaths = deaths.get(element[0].countriesAndTerritories);
      if(!transformedElem.totalDeaths)
        transformedElem.totalDeaths = 0;
      totalDeathsTracker.push(transformedElem.totalDeaths);
      transformedElem.recentCases = recentCases.get(element[0].countriesAndTerritories)
      if(!transformedElem.recentCases)
        transformedElem.recentCases = 0;
      recentCasesTracker.push(transformedElem.recentCases);
      transformedElem.recentDeaths = deathsCases.get(element[0].countriesAndTerritories)
      if(!transformedElem.recentDeaths)
        transformedElem.recentDeaths = 0;
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
        if (country === undefined || country.includes(listItem.countriesAndTerritories)) {
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
        if ((mostRecentDate < new Date(parseInt(listItem.year), parseInt(listItem.month - 1), parseInt(listItem.day))) && (country === undefined || country.includes(listItem.countriesAndTerritories))) {
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