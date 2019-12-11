import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PublicMenu extends Component {
    render() {
        return (
            <>
                {/* <div className="ui large top fixed menu transition hidden"> */}
                <div style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} className="ui large top menu transition">
                    <div className="ui container">
                        <Link to="/" className="header item">
                            <img className="logo" style={{ marginRight: '1em' }} src="https://semantic-ui.com/examples/assets/images/logo.png" />Home
                            </Link>
                        <Link to="#" className="item">Spaces</Link>
                        <Link to="#" className="item">About</Link>
                        <Link to="#" className="item">Contact</Link>
                        <div className="right item">
                            {localStorage.getItem('login') ? (
                                <Link to="/admin/dashboard" className="ui primary button">Go to Dashboard</Link>
                            ) : (
                                <>
                                    <Link to="/login" style={{ marginRight: '1em' }} className="ui button">Log in</Link>
                                    <Link to="/register" className="ui primary button">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}