import data from './data.json'; //https://www.ecdc.europa.eu/
import countries from './countries.json'; //https://datahub.io/JohnSnowLabs/country-and-continent-codes-list
import geo_location from './long_lat.json';//https://developers.google.com/public-data/docs/canonical/countries_csv

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
    var exclusionList = [];
    response.records.forEach(element => {
      var continentCode = undefined;
      var continentName = undefined;

      var latitude = undefined;
      var longitude = undefined;

      geo_location.forEach(location => {
        if ((location.country === element.geoId || location.name === element.countriesAndTerritories.replace(/_/g, " "))) {
          latitude = location.latitude;
          longitude = location.longitude;
        }
      })

      countries.forEach(country => {
        if (country.Three_Letter_Country_Code === element.countryterritoryCode || country.Two_Letter_Country_Code === element.geoId || country.Continent_Name === element.continentExp) {
          continentCode = country.Continent_Code;
          continentName = country.Continent_Name;
        }
      })

      element["continentCode"] = continentCode;
      element["continentName"] = continentName;

      element["latitude"] = latitude;
      element["longitude"] = longitude;

      if(element["latitude"] && element["longitude"] && element["continentCode"] && element["continentName"]) {
        if (countryMap.get(element.countriesAndTerritories) !== undefined) {
          countryMap.get(element.countriesAndTerritories).push(element);
        } else {
          countryMap.set(element.countriesAndTerritories, [element]);
        }
      } else {
        exclusionList.push(element);
      }
    });

    console.log("Failed to add following to data:", exclusionList);
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