import React, { Component } from 'react';
import { Map, TileLayer, CircleMarker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import M from "materialize-css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: this.getAllSettings()[1].map,
      color: this.getAllSettings()[1].color,
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  getAllSettings() {
    return {
      1: {
        map: "totalCases",
        color: "#2BB11A",
      },
      2: {
        map: "totalDeaths",
        color: "#CDAF1C",
      },
      3: {
        map: "recentCases",
        color: "#1C8ECD",
      },
      4: {
        map: "recentDeaths",
        color: "#C70039",
      }
    };
  }

  handleClick(lol, sa) {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    var newSate = instances[0].getSelectedValues()[0];
    this.setState({
      map: this.getAllSettings()[newSate].map,
      color: this.getAllSettings()[newSate].color
    });
  }

  render() {
    return (
      <div>
        <div class="input-field col s12">
          <select onChange={this.handleClick.bind(this)}>
            <option value="1" selected>Display Total Cases</option>
            <option value="3">Display Recent Cases</option>
            <option value="2">Display Total Deaths</option>
            <option value="4">Display Recent Deaths</option>
          </select>
          <label>Select Map</label>
        </div>
        <Map
          center={[0, 0]}
          zoom="2"
          zoomControl="false"
          style={{ width: '100%', height: '500px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            detectRetina="true"
            maxZoom="10"
            maxNativeZoom="10"
          />

          {this.props.chartData.map(data => {
            if (data[this.state.map] !== 0) {
              return (
                <CircleMarker
                  center={data.latLong}
                  key={data.country + "_cases"}
                  opacity={0.7}
                  radius={data[this.state.map + "MinMax"]}
                  color={this.state.color}
                >
                  <Popup>Location: {data.country.replace(/_/g, " ")}<br></br>
                Total Cases: {data.totalCases}<br></br>
                Total Deaths: {data.totalDeaths}<br></br>
                Recent Cases: {data.recentCases}<br></br>
                Recent Deaths: {data.recentDeaths}
                  </Popup>
                </CircleMarker>
              )
            }
          }
          )}
        </Map>
      </div>

    )
  }
}

export default MapChart;