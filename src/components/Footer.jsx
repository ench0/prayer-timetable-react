import React, { Component } from 'react'
import PropTypes from 'prop-types'

import defsettings from '../settings.json'
import moment from 'moment-hijri'
import { Offline, Online } from 'react-detect-offline'
import wifiOn from '../style/img/wifiOn.svg'
import wifiOff from '../style/img/wifiOff.svg'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      settings: defsettings,
      day: {}
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.settings !== this.state.settings && nextProps.settings !== null) {
      this.setState({ settings: nextProps.settings })
    }
    if (nextProps.day !== this.state.day && nextProps.day !== null) {
      this.setState({ day: nextProps.day })
    }
  }

  render () {
    // console.log('!!!', this.state.settings)
    let ramadan
    if (this.state.day.ramadanCountdown) {
      ramadan = <div className='left'>{this.state.day.ramadanCountdown} to Ramadan</div>
    }

    return (
      <div className='Footer'>
        <div className='left'>{this.state.settings.labels.jummuah} {this.state.settings.jummuahtime}</div>
        {ramadan}
        <div className='center'>
          <Offline>
            <img src={wifiOff} className='wifiOff' alt='wifiOff' />
          </Offline>
          <Online>
            <img src={wifiOn} className='wifiOn' alt='wifiOn' />
          </Online>
        </div>
        <div className='right'>
          Updated {moment(this.state.settings.updated * 1000).format('DD/MM/YY')}
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  settings: PropTypes.object
}

export default Footer
