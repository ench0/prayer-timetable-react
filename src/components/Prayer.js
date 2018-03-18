import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';




// import momenttz from 'moment'
import moment from 'moment-hijri'
import 'moment-timezone'

// import prayers from '../cities/dublin.json'
// import settings from '../settings.json'


moment.locale('en-ie')








class Prayer extends Component {

    
    constructor(props) {
        super(props)
        // var tomorrow = 0
        this.state = {
            // prayers: []
        }

    }

    componentDidMount() {
        // this.getTimes();
    }

    componentWillUnmount() {
        // clearInterval(this.timerID)
    }



    render() {
        // console.log(this.props.nextName, this.props.prayer.name)
        var next
        if(this.props.nextName === this.props.prayer.name || this.props.nextName === this.props.prayer.name+' jamaah') next = 'prayerRow next'; else next = 'prayerRow'

        return (
            <div className={next}>

                <div className='prayerName'>
                    {this.props.prayer.name}
                    
                </div>
                <div className='adhanTime'>
                    {this.props.prayer.time.format('H:mm')}
                </div>
                <div className='iqamahTime'>
                    {this.props.prayer.jamaah.time.format('H:mm')}
                </div>
            </div>
        );
    }
}

export default Prayer;
