import React, { Component } from 'react';

export default class PublicMenu extends Component {
    render() {
        return (
            <div className="ui stackable menu">
                <div className="item">
                    <img src="/logo192.png" alt="logo" />
                </div>
                <a href="/" className="item">Features</a>
                <a href="/" className="item active">Testimonials</a>
                <a href="/" className="item">Sign-in</a>
            </div>
        );
    }
}