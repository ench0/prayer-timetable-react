import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';


// import momenttz from 'moment'
import moment from 'moment-hijri';
// import 'moment-timezone'

// import timetable from '../cities/dublin.json'
// import settings from '../settings.json'

import Prayer from '../components/Prayer';

moment.locale('en-ie');

// console.log(prayers)


class Timetable extends Component {
  constructor(props) {
    super(props);

    propTypes: {
      jamaahShow: PropTypes.string.isRequired
    }

    // var tomorrow = 0
    this.state = {
      timetable: [],
      tomorrow: 0,
      dst: 0,
      prayers: this.props.prayers,
      jamaahShow: this.props.jamaahShow,
    };
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
    if (nextProps.jamaahShow !== this.state.jamaahShow) {
      this.setState({ jamaahShow: nextProps.jamaahShow });
    }
    // console.log(nextProps)
  }


  renderPrayers() {
    const list = this.state.prayers.list;
    const nextName = this.state.prayers.next.name;

    return (
      <div>
        {list.map((prayer, index) => <Prayer key={index} prayer={prayer} nextName={nextName} jamaahShow={this.state.jamaahShow} />)}
      </div>
    );
  }


  render() {
    let adhan;
    let iqamah;
    if (this.state.jamaahShow) {
      adhan = <div className="adhanTime">Adhan</div>;
      iqamah = <div className="iqamahTime">Iqamah</div>;
    } else {
      adhan = <div className="adhanTime right">Adhan</div>;
      iqamah = '';
    }


    return (
      <div className="Timetable">
        <div className="prayerHeader">
          <div>Prayer</div>
          {adhan}
          {iqamah}

        </div>
        {this.renderPrayers()}
        {/* {console.log(this.state.prayers)} */}
      </div>
    );
  }
}

export default Timetable;
