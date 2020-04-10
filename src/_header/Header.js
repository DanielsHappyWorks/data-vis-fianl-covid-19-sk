import React, { Component } from 'react';
import data from '../data.json';
import './header.scss';

// Import Materialize
import M from "materialize-css";


class SuperCoolComponent extends Component {

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
  }

  render() {
    return (
      <header>
        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo center">COVID-19</a>
          </div>
        </nav>
      </header>
    )
  }
}

export default SuperCoolComponent;