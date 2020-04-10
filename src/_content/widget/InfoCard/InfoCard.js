import React, { Component } from 'react';
import M from "materialize-css";
import './InfoCard.scss';


class InfoCard extends Component {
    constructor(props) {
        super(props);
        console.log(props);

    }


    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <div class={this.props.columns}>
                <div class="card InfoCard">
                    <h5 class="header">{this.props.heading}</h5>
                    <p>{this.props.data}</p>
                </div>
            </div>
        )
    }
}

export default InfoCard;