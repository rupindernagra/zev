import React, { Component } from 'react';
import { Link, matchPath } from 'react-router-dom';

export default class AdminMobileFooter extends Component {
    render() {
        return (
            <div className="navbar-footer">
                <ActiveLink to="/admin/spaces"><i className="fa fa-fw fa-map-marker"></i> <span>Spaces</span></ActiveLink>
                <ActiveLink to="/admin/applicants"><i className="fa fa-fw fa-users"></i> <span>Applicants</span></ActiveLink>
                <ActiveLink to="/admin/profile"><i className="fa fa-fw fa-user"></i> <span>My Profile</span></ActiveLink>
            </div>
        );
    }
}

const ActiveLink = (props) => {
    const { pathname } = window.location;
    let match = matchPath(pathname, {
        path: props.to,
        exact: false,
        strict: false
    });
    return <Link className={match ? "active" : "" } to={props.to}> {props.children}</Link>;
}