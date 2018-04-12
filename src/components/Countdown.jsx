import React, { Component } from 'react';
import moment from 'moment-hijri';

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prayers: this.props.prayers,
      countdown: '--:--:--',
    };
  }


  // componentDidMount() {
  //     this.countdownID = setInterval(
  //         () => this.tick(),
  //         1000
  //     )
  // }

  // componentWillUnmount() {
  //     clearInterval(this.countdownID)
  // }


  componentWillReceiveProps(nextProps) {
    let countdown;

    if (nextProps.prayers !== this.state.prayers) {
      const timeToPrayer = moment.duration((this.state.prayers.next.time).diff(moment()), 'milliseconds').add(1, 's'); // .asMinutes()

      if (timeToPrayer < 1) countdown = '--:--:--';

      else countdown = `${this.appendZero(timeToPrayer.hours())}:${this.appendZero(timeToPrayer.minutes())}:${this.appendZero(timeToPrayer.seconds())}`;

      if (countdown === '00:00:00') countdown = '--:--:--';

      this.setState({ prayers: nextProps.prayers, countdown });
    }
    // console.log(nextProps)
  }

    /*
    ****************************************************
    APPEND ZERO
    ****************************************************
    */
    appendZero = (unit) => {
      if (unit < 10) unit = `0${unit}`;
      return unit;
    }

    // tick() {
    //     // console.log(this.state)
    //     var timeToPrayer = moment.duration((this.state.prayers.next.time).diff(moment()), 'milliseconds').add(1, 's') //.asMinutes()


    //     var countdown = this.appendZero(timeToPrayer.hours()) + ':' + this.appendZero(timeToPrayer.minutes()) + ':' + this.appendZero(timeToPrayer.seconds())

    //     var koko = this.state.koko


    //     this.setState({countdown, koko})
    // }


    render() {
      return (
        <div className="Countdown">
          <div>{this.state.prayers.next.name}</div>
          <div>{this.state.countdown}</div>
        </div>
      );
    }
}

export default Countdown;
