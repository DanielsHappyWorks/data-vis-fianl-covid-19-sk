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

  componentWillMount() {
    var data = Data.initialiseData();
    console.log(data)
    data.then(function (map) {
      console.log(map)
      this.setState({
        isLoggedIn: true,
        dataMap: map
      });
    }.bind(this));
  }

  componentDidMount() {
    // Auto initialize all the things!
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