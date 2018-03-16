import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import moment from 'moment-hijri'
// import settings from '../settings.json'
import mainLogo from'../img/logo.svg';

class Clock extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
            day: this.props.day,
            // time: this.props.time
        }
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(),
    //         1000
    //     )
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timerID)
    // }

    // tick() {
    //     this.setState({
    //         date: new Date()
    //     })
    // }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.date !== this.state.date) {
          this.setState({ date: nextProps.date });
        }
        if (nextProps.day !== this.state.day) {
            this.setState({ day: nextProps.day });
        }
        // console.log(nextProps)
      }


    render() {
        // var tomorrow
        // if(this.state.day.tomorrow) tomorrow = "tomorrow"; else tomorrow = "today"

        
        return (
            <div className="Clock">
                <img  src={mainLogo} className="logo" alt="logo"/>
                <div className="timeRow">
                    {this.state.date.toLocaleTimeString()}
                </div>
                <div className="dateRow">
                    <div>{this.state.day.gregorian}</div>
                    <div>{this.state.day.hijri}</div>
                    {/* <div>{tomorrow}</div> */}
                </div>
            </div>
        );
    }
}

export default Clock;