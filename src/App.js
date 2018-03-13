import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Clock from './components/Clock';
import Timetable from './components/Timetable';
import Countdown from './components/Countdown';
import Message from './components/Message';

import moment from 'moment-hijri'
import settings from './settings.json'

import timetable from './cities/dublin.json'

class App extends Component {

    
    constructor(props) {
        super(props)

        this.state = {
            timetable: [],
            dst: 0,
            date: new Date(),
            prayers: [],
            tomorrow: 0
        }

    }

    
    Prayers(tomorrow) {
        var dst = this.state.dst
        var current, next, list

        var month = (moment().add(dst, 'hour').month()) + 1
        var date = (moment()).add(dst, 'hour').date()

        var tmonth = (moment().add(1, 'day').add(dst, 'hour').month()) + 1
        var tdate = (moment()).add(1, 'day').add(dst, 'hour').date()

        const prayerNames = ['fajr','shurooq', 'dhuhr', 'asr',  'maghrib', 'isha']

        const listToday = [];
        const listTomorrow = [];
        prayerNames.forEach((prayer, index) => listToday.push(
            {
                name: prayer,
                time: moment({
                    hour: timetable[month][date][index][0],
                    minute: timetable[month][date][index][1]
                })
            }
        ));
        prayerNames.forEach((prayer, index) => listTomorrow.push(
            {
                name: prayer,
                time: moment({
                    hour: timetable[tmonth][tdate][index][0],
                    minute: timetable[tmonth][tdate][index][1]
                }).add(1, 'day')
            }
        ));        


        if (moment().isBetween(moment().startOf('day'), listToday[0].time)) {
            tomorrow = 0
            current = {name: 'midnight', time: moment().startOf('day')}
            next = {name: listToday[0].name, time: listToday[0].time}
            list = listToday
            // console.log('case 1')
        }
        // fajr-shurooq
        else if (moment().isBetween(listToday[0].time, listToday[1].time)) {
            tomorrow = 0
            current = {name: listToday[0].name, time: listToday[0].time}
            next = {name: listToday[1].name, time: listToday[1].time}
            list = listToday
            // console.log('case 2')
        }
        // shurooq-dhuhr
        else if (moment().isBetween(listToday[1].time, listToday[2].time)) {
            tomorrow = 0
            current = {name: listToday[1].name, time: listToday[1].time}
            next = {name: listToday[2].name, time: listToday[2].time}
            list = listToday
            // console.log('case 3')
        }
        // dhuhr-asr
        else if (moment().isBetween(listToday[2].time, listToday[3].time)) {
            tomorrow = 0
            current = {name: listToday[2].name, time: listToday[2].time}
            next = {name: listToday[3].name, time: listToday[3].time}
            list = listToday
            // console.log('case 4')
        }
        // asr-maghrib
        else if (moment().isBetween(listToday[3].time, listToday[4].time)) {
            tomorrow = 0
            current = {name: listToday[3].name, time: listToday[3].time}
            next = {name: listToday[4].name, time: listToday[4].time}
            list = listToday
            // console.log('case 5')
        }
        // maghrib-isha
        else if (moment().isBetween(listToday[4].time, listToday[5].time)
        ) {
            tomorrow = 0
            current = {name: listToday[4].name, time: listToday[4].time}
            next = {name: listToday[5].name, time: listToday[5].time}
            list = listToday
            // console.log('case 6')
        }
        // isha-midnight
        else if (moment().isBetween(listToday[5].time, moment().endOf('day'))) {
            tomorrow = 1
            current = {name: listToday[5].name, time: listToday[5].time}
            next = {name: listTomorrow[0].name, time: listTomorrow[0].time}
            list = listTomorrow
            // console.log('case 7')
        }
        else {
            tomorrow = 1
            current = {name: listToday[5].name, time: listToday[5].time}//.clone().add(-1, 'day')}
            list = listTomorrow

            // next = {name: 'midnight', time: moment().endOf('day')}
        }
  
        this.setState({tomorrow})

        // console.log(
        //     'now:', moment().format("DD/MM - H:mm"),
        //     '\nfajr:', listToday[0].time.format("DD/MM - H:mm"),
        //     '\nshurooq:', listToday[1].time.format("DD/MM - H:mm"),
        //     '\ndhuhr:', listToday[2].time.format("DD/MM - H:mm"),
        //     '\nmaghrib:', listToday[4].time.format("DD/MM - H:mm"),
        //     '\nisha:', listToday[5].time.format("DD/MM - H:mm"),
        //     '\ncurrent:', current.time.format("DD/MM - H:mm"),
        //     '\nnext:', next.time.format("DD/MM - H:mm")
        // )

        return {list, current, next, tomorrow}
    }

    Day(tomorrow) {
        var gregorian = moment().add(tomorrow, 'day').format('dddd, D MMMM YYYY')
        var hijri = moment().add((parseInt(settings.hijrioffset, 10) + parseInt(tomorrow, 10)), 'day').format('iD iMMMM iYYYY')

        return {gregorian, hijri, tomorrow} 
    }


    componentWillMount() {
        this.setState({
            prayers: this.Prayers(this.state.tomorrow),
            day: this.Day(this.state.tomorrow)
        })
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            prayers: this.Prayers(this.state.tomorrow),
            day: this.Day(this.state.tomorrow),
            date: new Date(),
        })
    }



    render() {

        // console.log(this.state.next)
        return (
        <div className="App">

            <Clock day={this.state.day} date={this.state.date} />
            <Timetable
                prayers={this.state.prayers}
            />
            <Countdown 
                prayers={this.state.prayers}
            />
            <Message />       
 
        </div>
        );
    }
}

export default App;
