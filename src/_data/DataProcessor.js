const Data = {
  data: undefined,

  setData: function (newData) {
    this.data = {
      "map": newData,
      "global": {
        "totals": {
          "Total Cases": this.getTotal(newData, 'cases'),
          "Latest Cases": this.getLatest(newData, 'cases'),
          "Total Deaths": this.getTotal(newData, 'deaths'),
          "Latest Deaths": this.getLatest(newData, 'deaths'),
        }
      }
    }
    console.log(this.data)
  },

  getData: function () {
    return this.data;
  },

  getThisFuckery: function (oldState) {
    var newState = oldState;
    newState.chartData.labels = Array.from(this.data.map.keys());
    var deathByContinent = new Map();

    this.data.map.forEach(element => {
      element.forEach(listItem => {
        if (deathByContinent.get(listItem.continentName) !== undefined) {
          deathByContinent.set(listItem.continentName, deathByContinent.get(listItem.continentName)+parseInt(listItem.deaths));
        } else {
          if(listItem.continentName==="Other")
            console.log(listItem)
          deathByContinent.set(listItem.continentName, parseInt(listItem.deaths));
        }
      });
    });
    console.log(deathByContinent);
    newState.chartData.labels = Array.from(deathByContinent.keys());
    newState.chartData.datasets[0].data = Array.from(deathByContinent.values());;
    return newState;
  },

  getTotal: function (data, value) {
    var counter = 0
    data.forEach(element => {
      element.forEach(listItem => {
        counter += parseInt(listItem[value])
      });
    });
    return counter;
  },

  getLatest: function (data, value) {
    var counter = 0
    data.forEach(element => {
      var mostRecentDate = new Date(1999, 1, 1);
      var mostRecentCase = 0
      element.forEach(listItem => {
        if (mostRecentDate < new Date(parseInt(listItem.year), parseInt(listItem.month - 1), parseInt(listItem.day))) {
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