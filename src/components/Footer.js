import React, { Component } from 'react';
// import settings from '../settings.json'
import moment from 'moment-hijri'
import { Offline, Online } from 'react-detect-offline';
import wifiOn from'../img/wifiOn.svg';
import wifiOff from'../img/wifiOff.svg';

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
                <div>
                    <Offline>
                        <img  src={wifiOff} className="wifiOff" alt="wifiOff"/>
                    </Offline>
                    <Online>
                        <img  src={wifiOn} className="wifiOn" alt="wifiOn"/>
                    </Online>
                </div>
                <div>Updated {moment(this.props.settings.update).format('DD/MM/YY')}</div>
            </div>
        );
    }
}

export default Footer
