import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import moment from 'moment-hijri'
import settings from '../settings.json'


class Message extends Component {

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
            <div className="Message">
                <h3>{settings.announcement}</h3>
                <div>{settings.body}</div>
            </div>
        );
    }
}

export default Message;
