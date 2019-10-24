import React, { Component } from 'react';
import AdminLTE, { Sidebar, Content, Row, Col, Box, Button } from 'adminlte-2-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom'
//import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import './dashboard.css';

const { Item } = Sidebar;
export default class Dashboard extends Component {
  sidebar = [
    <Item link="DashboardHome" text="Dashboard" to="/dashboard" icon="fa-home" />,
    <Item link="Profile" text="Profile" to="/profile" icon="fa-user" />,
    <Item link="Spaces" text="Spaces" to="/spaces" icon="fa-map-marker" />,
    <Item link="Applicants" text="Applicants" to="/applicants" icon="fa-users" />,
    <Item link="Logout" text="Logout" to="/logout" icon="fa-power-off" />,
  ];
  render() {
    if(!localStorage.getItem('login')){
      return <Redirect to='/admin' />
    }
    return (
      <AdminLTE title={["Zev", "Rector"]} titleShort={["Z", "R"]} theme="blue" sidebar={this.sidebar}>
        <DashboardHome path="/dashboard" />,
        <Profile path="/profile" />,
        <Spaces path="/spaces" />,
        <Applicants path="/applicants" />,
        <Logout path="/logout" />,
      </AdminLTE>
    );
  }
}
class DashboardHome extends Component {
  state = {}
  render() {
    return (<Content title="Dashboard" subTitle="Let's Start" browserTitle="Zev Rector :: Dashboard">
      <Row>
        <Col xs={12}>
          <Box title="Notification Area" type="primary" closable collapsable>
            <ul>
              <li>Welcome to the Zev Rector Homepage</li>
            </ul>
          </Box>
        </Col>
        {/* <Col xs={6}>
          <Box title="Another box">
            Content goes here
          </Box>
        </Col> */}
      </Row>
    </Content>);
  }
}

class Profile extends Component {
  state = {}
  render() {
    return (<Content title="Profile" subTitle="Manager Profile" browserTitle="Zev Rector :: Manager Profile">
      <Row>
        <Col xs={12}>
          <Box title="Profile" type="primary">
            <Col xs={{span:8,offset:2}} className="text-center">
              <div className="userDP">
                <i className="fa fa-user user"></i>
              </div>
              <div className="userName">
                {/* <input type="text" name="username" value="Kevin Parker" readOnly="true" />  */}
                Kevin Parker
                <i className="fa fa-pencil"></i>
              </div>
              <Button type="primary" text="Save" />
            </Col>
          </Box>
        </Col>
      </Row>
    </Content>);
  }
}

class Spaces extends Component {
  state = {}
  render() {
    return (<Content title="Spaces" subTitle="Spaces" browserTitle="Zev Rector :: Spaces">
      <Row>
        <Col xs={12}>
          <Box title="List of spaces" type="primary" footer={<Button type="primary" text="Save" />}>
            Spaces List here
          </Box>
        </Col>
      </Row>
    </Content>);
  }
}

class Applicants extends Component {
  state = {}
  render() {
    return (<Content title="Applicants" subTitle="Applicants" browserTitle="Zev Rector :: Applicants">
      <Row>
        <Col xs={12}>
          <Box title="List of Applicants" type="primary" footer={<Button type="primary" text="Save" />}>
            Spaces List here
          </Box>
        </Col>
      </Row>
    </Content>);
  }
}

class Logout extends Component {
  state = {}
  render() {
    localStorage.removeItem('login');
    return <Redirect to='/dashboard' />
  }
}