import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { Redirect } from 'react-router-dom'
import AdminLTE, { Sidebar } from 'adminlte-2-react';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import Spaces from './Spaces';
import SpaceSingle from './SpaceSingle';
import SpaceAdd from './SpaceAdd';
import Applicants from './Applicants';
import Logout from './Logout';
// import ShareModal from './ShareModal';
const { Item } = Sidebar;
//import {Container,Row,Col,Form,Button} from 'react-bootstrap';

export default class Dashboard extends Component {
  sidebar = [
    <Item key="DashboardHome" text="Dashboard" to="/dashboard" icon="fa-home" />,
    <Item key="Profile" text="Profile" to="/profile" icon="fa-user" />,
    <Item key="Spaces" text="Spaces" to="/spaces" icon="fa-map-marker"  />,
    // <Item key="SpaceAdd"  text="Add Space" to="/spaces_add" icon="fa-map-marker" children="Spaces" isSubItem={true} />,
    <Item key="SpaceAdd"  text="Add Space" to="/spaces_add" icon="fa-map-marker" />,
    <Item key="Applicants" text="Applicants" to="/applicants" icon="fa-users" />,
    <Item key="Logout" text="Logout" to="/logout" icon="fa-power-off" />,
  ];
  render() {
    if(!localStorage.getItem('login')) {
      return <Redirect to='/admin' />
    }
    return (
      <AdminLTE title={["Zev", "Rector"]} titleShort={["Z", "R"]} theme="blue" sidebar={this.sidebar}>
        <DashboardHome path="/dashboard" />
        <Profile path="/profile" />
        <Spaces path="/spaces" />
        <SpaceAdd path="/spaces_add" isSubItem={true} />
        <SpaceSingle path="/space/:spaceId" />
        <Applicants path="/applicants" />
        <Logout path="/logout" />
      </AdminLTE>
    );
  }
}