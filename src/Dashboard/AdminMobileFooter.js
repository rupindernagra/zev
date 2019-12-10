import React, { Component } from 'react';
import { Link, matchPath } from 'react-router-dom';

export default class AdminMobileFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="navbar-footer">
                <ActiveLink to="/admin/spaces"><i class="fa fa-fw fa-map-marker"></i> Spaces</ActiveLink>
                <ActiveLink to="/admin/applicants"><i class="fa fa-fw fa-users"></i> Applicants</ActiveLink>
                <ActiveLink to="/admin/profile"><i class="fa fa-fw fa-user"></i> My Profile</ActiveLink>
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
    return <Link class={match ? "active" : "" } to={props.to}> {props.children}</Link>;
}