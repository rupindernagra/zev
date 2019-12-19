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
    <Item key="DashboardHome" text="Dashboard" to="/admin/dashboard" icon="fa-home" />,
    <Item key="Profile" text="Profile" to="/admin/profile" icon="fa-user" />,
    <Item key="Spaces" text="Spaces" to="/admin/spaces" icon="fa-map-marker"  />,
    // <Item key="SpaceAdd"  text="Add Space" to="/admin/spaces_add" icon="fa-map-marker" children="Spaces" isSubItem={true} />,
    <Item key="SpaceAdd"  text="Add Space" to="/admin/spaces/add" icon="fa-plus" />,
    <Item key="Applicants" text="Applicants" to="/admin/applicants" icon="fa-users" />,
    <Item key="Logout" text="Logout" to="/logout" icon="fa-power-off" />,
  ];
  render() {
    if(!localStorage.getItem('login')) {
      return <Redirect to='/login' />
    }
    
    return (
      <AdminLTE title={["Zev", "Rector"]} titleShort={["Z", "R"]} theme="blue" sidebar={this.sidebar}>
        <DashboardHome path="/admin/dashboard" />
        <Profile path="/admin/profile" />
        <SpaceAdd path="/admin/spaces/add" isSubItem={true} />
        <SpaceSingle path="/admin/spaces/view/:spaceId" />
        <SpaceAdd path="/admin/spaces/edit/:spaceId" />
        <Spaces path="/admin/spaces" />
        <Applicants path="/admin/applicants" />
        <Logout path="/logout" />
      </AdminLTE>
    );
  }
}