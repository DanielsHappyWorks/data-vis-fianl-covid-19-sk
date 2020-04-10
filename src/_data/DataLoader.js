import data from './data.json';
import countries from './countries.json';

const Data = {

  initialiseData: async function () {
    if (this.shouldGetDataFromFile()) {
      return this.getDataFromFile();
    } else {
      //bypass cors issue https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
      let response = await fetch("https://cors-anywhere.herokuapp.com/https://opendata.ecdc.europa.eu/covid19/casedistribution/json/")
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          return this.getDataMap(json);
        }.bind(this))
        .catch(function (err) {
          console.log("Can’t access response. (Getting Data from File) Blocked by browser?" + err)
          return this.getDataFromFile();
        }.bind(this))
      return response;
    }
  },

  getDataMap: function (response) {
    var countryMap = new Map();
    response.records.forEach(element => {
      var continentCode = "Other";
      var continentName = "Other";

      countries.forEach(country => {
        if ((country.Three_Letter_Country_Code === element.countryterritoryCode)) {
          continentCode = country.Continent_Code;
          continentName = country.Continent_Name;
        } else if (element.countryterritoryCode === "" && country.Two_Letter_Country_Code === element.geoId) {
          continentCode = country.Continent_Code;
          continentName = country.Continent_Name;
        }
      })

      element["continentCode"] = continentCode;
      element["continentName"] = continentName;

      if (countryMap.get(element.countriesAndTerritories) !== undefined) {
        countryMap.get(element.countriesAndTerritories).push(element);
      } else {
        countryMap.set(element.countriesAndTerritories, [element]);
      }
    });

    console.log(countryMap);
    return countryMap;
  },

  shouldGetDataFromFile: function () {
    if(window.location.pathname === "/live") {
      return false;
    }
    return true;
  },

  getDataFromFile: function () {
    return this.getDataMap(data);
  }
}

export default Data;