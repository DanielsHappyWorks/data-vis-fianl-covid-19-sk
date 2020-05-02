import React, { Component } from 'react';
import './content.scss';
import M from "materialize-css";
import Dashboard from './dashboard/Dashboard';
import Data from '../_data/DataLoader'
import Loader from './loader/Loader'


class Content extends Component {
  constructor(){
    super();

    this.state = {
      isLoggedIn: false
    }
    
  }

  componentDidMount() {
    var data = Data.initialiseData();
    data.then(function (map) {
      this.setState({
        isLoggedIn: true,
        dataMap: map
      });
    }.bind(this));

    M.AutoInit();
  }

  render() {
    var renderItem = <Loader />;
    if (this.state.isLoggedIn) {
      renderItem = <Dashboard dataMap={this.state.dataMap}/>;
    }
    return (
      <main>
        <div>
          {renderItem}
        </div>
      </main >
    )
  }
}

export default Content;