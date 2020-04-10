import React from 'react';
import data from '../data.json';
import './footer.scss';

class Footer extends React.Component {
  render() {
    var links = data.socialMediaLinks.map(function (link) {
      return <li><a class="grey-text text-lighten-3" href={link.link}>{link.name}</a></li>;
    })

    return (
      <footer class="page-footer">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 class="white-text">{data.footer.heading}</h5>
              <p class="grey-text text-lighten-4">{data.footer.content}</p>
            </div>
            <div class="col l4 offset-l2 s12">
              <h5 class="white-text">Links</h5>
              <ul>{links}</ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">{data.footer.copyright}</div>
        </div>
      </footer>
    );
  }
}

export default Footer;