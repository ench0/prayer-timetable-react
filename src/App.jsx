import React, { Component } from 'react'

import moment from 'moment-hijri'
// import momenttz from 'moment-timezone'

import { prayersCalc, dayCalc } from 'prayer-timetable-lib'
// import { prayersCalc, dayCalc } from './test_calc' // for testing purposes

import './style/normalize.css'
import './style/App.css'

import Overlay from './components/Overlay'
import Clock from './components/Clock'
import Prayers from './components/Prayers'
import Countdown from './components/Countdown'
import Message from './components/Message'
import Header from './components/Header'
import Footer from './components/Footer'

// moment.tz = require('moment-timezone');
import defsettings from './settings.json'
import deftimetable from './cities/dublin.json'

class TimetableApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timetable: deftimetable,
      // settings: { join: '' },
      settings: defsettings,
      dst: 0,
      date: new Date(),
      day: {},
      prayers: {
        next: { time: moment(), name: '' },
        current: { time: moment(), name: '' },
        list: []
      },
      tomorrow: 0,
      name: '',
      jamaahShow: true,
      overlayActive: false,
      overlayTitle: ' ... ',
      jummuahTime: moment({ hour: '13', minute: '10' }).day(5),
      taraweehTime: moment({ hour: '23', minute: '00' }), // .iMonth(8),
      refresh: this.props.refresh || 60,
      timePeriod: '',
      join: '0',
      log: false,
      refreshed: moment().format('HH:mm')
    }
  }

  /**********************************************************************
  STATES
  **********************************************************************/
  async componentWillMount() {
    prayersCalc(
      this.state.tomorrow,
      this.state.settings,
      this.state.timetable,
      this.state.jamaahShow,
      this.state.join,
      this.state.log
    )

    document.title = 'ICCI Timetable'
    try {
      if ((await localStorage.getItem('settings')) !== 'undefined') {
        var newsettings = await JSON.parse(localStorage.getItem('settings'))
        await this.setState({ settings: newsettings })
      }
      if ((await localStorage.getItem('timetable')) !== 'undefined') {
        var newtimetable = await JSON.parse(localStorage.getItem('timetable'))
        await this.setState({ timetable: newtimetable })
      }
      // await this.setState({ settings: newsettings, timetable: newtimetable, join: newsettings.join })
    } catch (error) {
      console.log(error)
    }

    this.setState({
      // tomorrow=0, settings={jamaahmethods=[], jamaahoffsets=[]}, timetable, jamaahShow='0', join=false, test=false }
      prayers: prayersCalc(
        this.state.tomorrow,
        this.state.settings,
        this.state.timetable,
        this.state.jamaahShow,
        this.state.join,
        this.state.log
      ),
      day: dayCalc(this.state.tomorrow, {
        hijrioffset: this.state.settings.hijrioffset
      })
    })
  }

  async componentDidMount() {
    await this.update()

    this.timerID = setInterval(() => this.tick(), 1000)
    this.updateID = setInterval(() => this.update(), this.state.refresh * 60 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
    clearInterval(this.updateID)
  }

  /**********************************************************************
  SCRIPTS
  **********************************************************************/
  tick() {
    this.setState({
      prayers: prayersCalc(
        this.state.tomorrow,
        this.state.settings,
        this.state.timetable,
        this.state.jamaahShow,
        this.state.join,
        this.state.log
      ),
      day: dayCalc(this.state.tomorrow, {
        hijrioffset: this.state.settings.hijrioffset
      }),
      tomorrow: this.state.prayers.newtomorrow,
      jummuahTime: moment({ hour: '13', minute: '10' }).day(5),
      taraweehTime: moment({ hour: '23', minute: '00' }) // .iMonth(8),
    })

    if (moment().isBetween(this.state.jummuahTime, this.state.jummuahTime.clone().add(1, 'hour'))) {
      this.setState({
        overlayActive: true,
        overlayTitle: 'Jummuah Prayer'
      })
    } else if (
      moment().format('iM') === '9' &&
      //   this.state.prayers.current.name === 'asr' &&
      moment().isBetween(this.state.taraweehTime, this.state.taraweehTime.clone().add(2, 'hour'))
    ) {
      this.setState({
        overlayActive: true,
        overlayTitle: 'Taraweeh Prayer'
      })
    } else if (
      moment().format('iM') === '9' &&
      //   this.state.prayers.current.name === 'asr' &&
      moment().isBetween(
        moment().startOf('day'),
        moment()
          .startOf('day')
          .clone()
          .add(1, 'hour')
      )
    ) {
      this.setState({
        overlayActive: true,
        overlayTitle: 'Taraweeh Prayer'
      })
    } else {
      this.setState({
        overlayActive: false,
        overlayTitle: ' ... '
      })
    }
    // console.log(this.state.prayers.newtomorrow)
    console.log(this.state.taraweehTime.format('H:mm D'))
  }

  async update() {
    if (this.state.refresh !== 0) {
      try {
        const res = await fetch('https://islamireland.ie/api/timetable/', {
          mode: 'cors'
        })
        // set vars
        const { name, settings, timetable } = await res.json()
        // update states and storage
        await this.setState({ settings, timetable, name })
        await localStorage.setItem('settings', JSON.stringify(settings))
        await localStorage.setItem('timetable', JSON.stringify(timetable))

        this.setState({
          refreshed: moment().format('HH:mm')
        })
        console.log('refreshed:', moment().format('HH:mm'))
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**********************************************************************
  RENDERING
  **********************************************************************/
  render() {
    // console.log(this.state.overlayActive)
    // console.log(this.state.day)

    let overlay
    if (this.state.overlayActive) {
      overlay = <Overlay settings={this.state.settings} day={this.state.day} overlayTitle={this.state.overlayTitle} />
    } else overlay = ''

    return (
      <div className="TimetableApp">
        {/* <Overlay settings={this.state.settings} day={this.state.day} overlayTitle={this.state.overlayTitle} overlayActive={this.state.overlayActive} /> */}
        {overlay}
        <Header settings={this.state.settings} />
        <Clock day={this.state.day} />
        <Prayers prayers={this.state.prayers} jamaahShow={this.state.jamaahShow} join={this.state.join} />
        <Countdown prayers={this.state.prayers} />
        <Message settings={this.state.settings} />
        <Footer
          settings={this.state.settings}
          day={this.state.day}
          jummuahTime={this.state.jummuahTime}
          taraweehTime={this.state.taraweehTime}
          refreshed={this.state.refreshed}
        />
      </div>
    )
  }
}

export default TimetableApp
