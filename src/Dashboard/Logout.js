import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('login')) {
            localStorage.clear();
            this.state = {
                loggedOut: localStorage.getItem('login') ? false : true
            };
        }

    }
    componentDidMount() {
        console.log(localStorage.getItem('login'));
        this.setState({
            loggedOut: localStorage.getItem('login') ? false : true
        });
    }
    render() {
        if (this.state.loggedOut || !localStorage.getItem('login')) {
            window.location.reload(false);
            return <Redirect to='/admin' />
        }

        return <Redirect to={'/dashboard'} />
    }
}