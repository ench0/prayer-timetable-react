import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';




// import momenttz from 'moment'
import moment from 'moment-hijri'
// import 'moment-timezone'

// import timetable from '../cities/dublin.json'
// import settings from '../settings.json'

import Prayer from '../components/Prayer'

moment.locale('en-ie')

// console.log(prayers)







class Timetable extends Component {

    
    constructor(props) {
        super(props)



        // var tomorrow = 0
        this.state = {
            timetable: [],
            tomorrow: 0,
            dst: 0,
            prayers: this.props.prayers
        }

    }


    componentDidMount() {
        // this.getTimes();
        // {console.log(this.state.prayers)}
        // console.log(this.state.prayers)

    }

    componentWillUnmount() {
        // clearInterval(this.timerID)
        // console.log(this.state.prayers)

    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.prayers !== this.state.prayers) {
          this.setState({ prayers: nextProps.prayers });
        }
        // console.log(nextProps)
    }


    renderPrayers() {
        var list = this.state.prayers.list
        var nextName = this.state.prayers.next.name

        return (
            <div>
                {list.map((prayer, index) => {
                    return <Prayer key={index} prayer={prayer} next={nextName}/>
                })}
            </div>
        )
    }


    render() {
        return (
            <div className='Timetable'>
                <div className='prayerHeader'>
                    <div>Prayer</div><div>Time</div>
                </div>
                    {this.renderPrayers()}
                    {/* {console.log(this.state.prayers)} */}
            </div>
        );
    }
}

export default Timetable;
