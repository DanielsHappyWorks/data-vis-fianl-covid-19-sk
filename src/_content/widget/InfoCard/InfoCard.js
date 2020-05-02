import React, { Component } from 'react';
import M from "materialize-css";
import './InfoCard.scss';


class InfoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <div className={this.props.columns}>
                <div className="card InfoCard">
                    <h5 className="header">{this.props.heading}</h5>
                    <p>{this.props.data}</p>
                </div>
            </div>
        )
    }
}

export default InfoCard;