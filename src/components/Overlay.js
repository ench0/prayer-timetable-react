import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import moment from 'moment-hijri'
// import settings from '../settings.json'


class Overlay extends Component {

    constructor(props) {
        super(props)

        this.state = {
            settings: this.props.settings
        }
    }

    componentDidMount() {
        const height = this.divElement.clientHeight
        this.setState({height})
        // console.log(height)
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.settings !== this.state.settings) {
          this.setState({ settings: nextProps.settings });
        }
    }

    render() {
        return (
            <div className="Overlay" ref={(divElement) => this.divElement = divElement}>
                <div>
                    {/* {this.state.settings.announcement} */}
                    {/* {this.state.height} */}
                    KOKO
                </div>
                <h3>title</h3>
                {/* <div>{this.state.settings.body}</div> */}
                {/* <marquee behavior="scroll" direction="up" className="marquee" scrolldelay="300">{this.state.settings.body}</marquee> */}

            </div>
        );
    }
}

export default Overlay;
