import React from 'react';
import './footer.scss';

class Footer extends React.Component {
  render() {

    return (
      <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">What is this?</h5>
                <p className="grey-text text-lighten-4">This page is a Dashboard that visialises Covid-19 information provided by ecdc. It uses React, materializecss, Chart.js and Leaflet to display the visualisations in a coherent manner.</p>
                <li><a className="grey-text text-lighten-3" href="/data-vis-fianl-covid-19-sk/?live=true">See Latest Data go to /data-vis-fianl-covid-19-sk?live=true</a></li>
                <li><a className="grey-text text-lighten-3" href="/data-vis-fianl-covid-19-sk/">See Cached Data from Apr 13 2020 go to /data-vis-fianl-covid-19-sk/</a></li>
                <li><a className="grey-text text-lighten-3" href="/data-vis-fianl-covid-19-sk/?live=true&country=Ireland">To See Data for a specific country you can put in ?country=Irelend</a></li>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Data Used:</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="https://www.ecdc.europa.eu/">Covid-19 - ecdc</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://datahub.io/JohnSnowLabs/country-and-continent-codes-list">Country Data - JohnSnowLabs</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://developers.google.com/public-data/docs/canonical/countries_csv">LatLng Data - Google</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            Visualisation by Daniel Foth
            <a className="grey-text text-lighten-4 right" href="/data-vis-fianl-covid-19-sk/?live=true">Data: Latest</a>
            <a className="grey-text text-lighten-4 right" href="/data-vis-fianl-covid-19-sk/">Data: Apr 13 2020</a>
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;