import React, { Component } from 'react';
// import settings from '../settings.json'


class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <div className="Header">
                <div></div>
                <div>{this.props.settings.title}</div>
                <div></div>
            </div>
        );
    }
}

export default Header
