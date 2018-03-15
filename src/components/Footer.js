import React, { Component } from 'react';
// import settings from '../settings.json'
import moment from 'moment-hijri'

class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <div className="Footer">
                {/* {console.log(settings)} */}
                <div>{this.props.settings.jummuahlabel} {this.props.settings.jummuahtime}</div>
                <div>Updated {moment(this.props.settings.update).format('DD/MM/YY')}</div>
            </div>
        );
    }
}

export default Footer
