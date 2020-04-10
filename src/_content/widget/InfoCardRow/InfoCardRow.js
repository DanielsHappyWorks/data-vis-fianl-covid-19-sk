import React, { Component } from 'react';
import M from "materialize-css";
import InfoCard from '../InfoCard/InfoCard';


class InfoCardRow extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {};
    }

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <div class="row">
                {Object.keys(this.props.cards).map(key => (
                    <InfoCard columns={this.props.columns} heading={key} data={this.props.cards[key]} />
                ))}
            </div>
        )
    }
}

export default InfoCardRow;