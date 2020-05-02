import React, { Component } from 'react';
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
          <div className="nav-wrapper">
            <div className="brand-logo center">COVID-19</div>
          </div>
        </nav>
      </header>
    )
  }
}

export default SuperCoolComponent;