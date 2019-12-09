import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PublicMenu extends Component {
    render() {
        return (
            <div className="ui stackable menu">
                <div className="item">
                    <img src="/logo192.png" alt="logo" />
                </div>
                <Link to className="item">Spaces</Link>
                <Link to className="item active">Testimonials</Link>
                <Link to className="item">Sign-in</Link>
            </div>
        );
    }
}