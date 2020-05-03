import React from 'react';
import './footer.scss';

class Footer extends React.Component {
  render() {

    return (
      <footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">What is this?</h5>
                <p class="grey-text text-lighten-4">This page is a Dashboard that visialises Covid-19 information provided by ecdc. It uses React, materializecss, Chart.js and Leaflet to display the visualisations in a coherent manner.</p>
                <li><a class="grey-text text-lighten-3" href="/covid_19/live">See Latest Data go to /covid_19/live</a></li>
                <li><a class="grey-text text-lighten-3" href="/covid_19/">See Cached Data from Apr 13 2020 go to /covid_19/</a></li>
                <li><a class="grey-text text-lighten-3" href="/covid_19/live?country=Ireland">To See Data for a specific country you can put in ?country=Irelend</a></li>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Data Used:</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="https://www.ecdc.europa.eu/">Covid-19 - ecdc</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://datahub.io/JohnSnowLabs/country-and-continent-codes-list">Country Data - JohnSnowLabs</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://developers.google.com/public-data/docs/canonical/countries_csv">LatLng Data - Google</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            Visualisation by Daniel Foth
            <a class="grey-text text-lighten-4 right" href="/covid_19/live">Data: Latest</a>
            <a class="grey-text text-lighten-4 right" href="/covid_19">Data: Apr 13 2020</a>
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;