import React, { Component } from 'react';
// import logo from './logo.svg';
import './style/App.css';

import Overlay from './components/Overlay';
import Clock from './components/Clock';
import Timetable from './components/Timetable';
import Countdown from './components/Countdown';
import Message from './components/Message';
import Header from './components/Header';
import Footer from './components/Footer';

import moment from 'moment-hijri'
import defsettings from './settings.json'

import deftimetable from './cities/dublin.json'


// var settings = defsettings
// var timetable = deftimetable


class App extends Component {

    
    constructor(props) {
        super(props)

        this.state = {
            timetable: deftimetable,
            dst: 0,
            date: new Date(),
            day: '',
            prayers: {next: {time: moment(), name: ''}, current: '', list: []},
            tomorrow: 0,
            settings: defsettings,
            jamaahShow: 1,
            overlayTitle: 'Welcome',
            jummuahTime: moment({ hour: '13', minute: '10' }).day(4)
        }

    }

    /* JAMAAH CALC */
    jamaahCalc = function(num, time, timenext) {
        // console.log ("jamaahcalc",this)

        var jamaahMethodSetting = (this.state.settings.jamaahmethods).split(',')[num]
        var jamaahOffsetSetting = ((this.state.settings.jamaahoffsets).split(',')[num]).split(':')

        var jamaahOffset
        switch (jamaahMethodSetting) {
        case 'afterthis':
            jamaahOffset = parseInt(jamaahOffsetSetting[0] * 60 + jamaahOffsetSetting[1], 10)
            break
        case 'fixed':
            jamaahOffset = (moment().month(time.get('month')).date(time.get('date')).hour(jamaahOffsetSetting[0]).minute(jamaahOffsetSetting[1])).diff(time, 'minutes')
            if (moment().month(time.get('month')).date(time.get('date')).hour(jamaahOffsetSetting[0]).minute(jamaahOffsetSetting[1]).isBefore(time)) jamaahOffset--
            break
        case 'beforenext':
            jamaahOffset = (timenext.subtract({
                minutes: parseInt(jamaahOffsetSetting[0] * 60 + jamaahOffsetSetting[1], 10)
            })).diff(time, 'minutes')
            break
        case '':
            jamaahOffset = ''
            break
        default:
            jamaahOffset = 0
        }
        // console.log(jamaahOffset)
        return jamaahOffset
    }
    
    Prayers(tomorrow) {
        // console.log(this.state.timetable)
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
                    hour: this.state.timetable[month][date][index][0],
                    minute: this.state.timetable[month][date][index][1]
                }),
                jamaah: {
                    offset: this.jamaahCalc(index, moment({hour: this.state.timetable[month][date][index][0],minute: this.state.timetable[month][date][index][1]})),
                    time: moment({
                        hour: this.state.timetable[month][date][index][0],
                        minute: this.state.timetable[month][date][index][1]
                    }).add(this.jamaahCalc(index, moment({hour: this.state.timetable[month][date][index][0],minute: this.state.timetable[month][date][index][1]})), 'minutes')
                }
            }
        ));
        prayerNames.forEach((prayer, index) => listTomorrow.push(
            {
                name: prayer,
                time: moment({
                    hour: this.state.timetable[tmonth][tdate][index][0],
                    minute: this.state.timetable[tmonth][tdate][index][1]
                }).add(1, 'day'),
                jamaah: {
                    offset: this.jamaahCalc(index, moment({hour: this.state.timetable[month][date][index][0],minute: this.state.timetable[month][date][index][1]})),
                    time: moment({
                        hour: this.state.timetable[tmonth][tdate][index][0],
                        minute: this.state.timetable[tmonth][tdate][index][1]
                    }).add(1, 'day').add(this.jamaahCalc(index, moment({hour: this.state.timetable[month][date][index][0],minute: this.state.timetable[month][date][index][1]})), 'minutes')
                }
            }
        ));        

        // console.log(listToday)


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
            // jamaah
            if(this.state.jamaahShow === 1 && moment().isBetween(listToday[0].time,  listToday[0].jamaah.time)) {
                next = {name: listToday[0].name+' jamaah', time: listToday[0].jamaah.time}
            }
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
            // jamaah
            if(this.state.jamaahShow === 1 && moment().isBetween(listToday[2].time,  listToday[2].jamaah.time)) {
                next = {name: listToday[2].name+' jamaah', time: listToday[2].jamaah.time}
            }
            // console.log('case 4')
        }
        // asr-maghrib
        else if (moment().isBetween(listToday[3].time, listToday[4].time)) {
            tomorrow = 0
            current = {name: listToday[3].name, time: listToday[3].time}
            next = {name: listToday[4].name, time: listToday[4].time}
            list = listToday
            // jamaah
            if(this.state.jamaahShow === 1 && moment().isBetween(listToday[3].time,  listToday[3].jamaah.time)) {
                next = {name: listToday[3].name+' jamaah', time: listToday[3].jamaah.time}
            }
            // console.log('case 5')
        }
        // maghrib-isha
        else if (moment().isBetween(listToday[4].time, listToday[5].time)
        ) {
            tomorrow = 0
            current = {name: listToday[4].name, time: listToday[4].time}
            next = {name: listToday[5].name, time: listToday[5].time}
            list = listToday
            // jamaah
            if(this.state.jamaahShow === 1 && moment().isBetween(listToday[4].time,  listToday[4].jamaah.time)) {
                next = {name: listToday[4].name+' jamaah', time: listToday[4].jamaah.time}
            }
            // console.log('case 6')
        }
        // isha-midnight
        else if (moment().isBetween(listToday[5].time, moment().endOf('day'))) {
            tomorrow = 1
            current = {name: listToday[5].name, time: listToday[5].time}
            next = {name: listTomorrow[0].name, time: listTomorrow[0].time}
            list = listTomorrow
            // jamaah
            if(this.state.jamaahShow === 1 && moment().isBetween(listToday[5].time,  listToday[5].jamaah.time)) {
                next = {name: listToday[5].name+' jamaah', time: listToday[5].jamaah.time}
            }
            // console.log('case 7')
        }
        else {
            tomorrow = 1
            current = {name: listToday[5].name, time: listToday[5].time}//.clone().add(-1, 'day')}
            list = listTomorrow
            next = {name: listTomorrow[0].name, time: listTomorrow[0].time}
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
        var hijri = moment().add((parseInt(this.state.settings.hijrioffset, 10) + parseInt(tomorrow, 10)), 'day').format('iD iMMMM iYYYY')

        return {gregorian, hijri, tomorrow} 
    }



    async componentWillMount()
    {
        this.setState({
            prayers: this.Prayers(this.state.tomorrow),
            day: this.Day(this.state.tomorrow),
            settings: defsettings,
            jamaahShow: 1
        })
    }

    async componentDidMount() {

        try {
            // var settings, timetable

            if (await localStorage.getItem('settings') !== 'undefined') {
                // settings = JSON.parse(await localStorage.getItem('settings'))
                var newsettings = await localStorage.getItem('settings')             
                }
                if (await localStorage.getItem('timetable') !== 'undefined') {
                // timetable = JSON.parse(await localStorage.getItem('timetable'))
                var newtimetable = await localStorage.getItem('timetable')
                }

            await this.setState({settings: newsettings, timetable: newtimetable})  
        } catch (error) {
            console.log(error)
        }

        await this.update()

        // console.log(this.state.settings)



        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
        this.updateID = setInterval(
            () => this.update(),
            3600*1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            prayers: this.Prayers(this.state.tomorrow),
            day: this.Day(this.state.tomorrow),
        })

        if (moment().isBetween(this.state.jummuahTime, this.state.jummuahTime.add(5, 'hour'))) this.setState({
            overlayActive: 1
        })
        console.log(this.state.jummuahTime)
        // localStorage.setItem('settings', 'koko')
    
        // console.log(localStorage.getItem('settings'))
    }

    async update() {
        try {
            const res = await fetch('https://timetable.islamireland.ie/api/', {mode: 'cors'})
            // set vars
            var {settings,timetable} = await res.json()
            // console.log(settings)
            // update states and storage
            await this.setState({settings,timetable})
            await localStorage.setItem('settings', settings);
            await localStorage.setItem('timetable', timetable);
            // console.log('timetable', timetable)
        } catch (error) {
            console.log(error)
        }
    }



    render() {

        // console.log(this.state.next)
        return (
        <div className="App">

            <Overlay settings={this.state.settings} day={this.state.day} title={this.state.overlayTitle} overlayActive={null} />
            <Header settings={this.state.settings} />
            <Clock day={this.state.day} />
            <Timetable
                prayers={this.state.prayers}
            />
            <Countdown 
                prayers={this.state.prayers}
            />
            <Message settings={this.state.settings} />       
            <Footer settings={this.state.settings} />

        </div>
        );
    }
}

export default App;
