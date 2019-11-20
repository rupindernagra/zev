import React, { Component } from 'react';
import AdminLTE, { Sidebar, Content, Row, Col, Box, Button, Inputs } from 'adminlte-2-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom'
//import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import './dashboard.css';
const { Select2, Date, DateTime, Text } = Inputs;

const { Item } = Sidebar;
export default class Dashboard extends Component {
  sidebar = [
    <Item link="DashboardHome" text="Dashboard" to="/dashboard" icon="fa-home" />,
    <Item link="Profile" text="Profile" to="/profile" icon="fa-user" />,
    <Item link="Spaces" text="Spaces" to="/spaces" icon="fa-map-marker"  />,
    // <Item link="SpaceAdd"  text="Add Space" to="/spaces_add" icon="fa-map-marker" children="Spaces" isSubItem={true} />,
    <Item link="SpaceAdd"  text="Add Space" to="/spaces_add" icon="fa-map-marker" />,
    <Item link="Applicants" text="Applicants" to="/applicants" icon="fa-users" />,
    <Item link="Logout" text="Logout" to="/logout" icon="fa-power-off" />,
  ];
  render() {
    if(!localStorage.getItem('login')) {
      return <Redirect to='/admin' />
    }
    return (
      <AdminLTE title={["Zev", "Rector"]} titleShort={["Z", "R"]} theme="blue" sidebar={this.sidebar}>
        <DashboardHome path="/dashboard" />,
        <Profile path="/profile" />,
        <Spaces path="/spaces" />,
        <SpaceAdd path="/spaces_add" isSubItem={true} />,
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
              <li>You Can Add Spaces</li>
              <li>You Can Send Forms To Users &amp; Select</li>
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
  addSpace(event) {
    event.preventDefault();

    console.log('click on space');
    window.location.href = "/dashboard";
  }
  
  state = {}
  render() {
    return (<Content title="Spaces" subTitle="Spaces" browserTitle="Zev Rector :: Spaces">
      <Row>
        <Col xs={12}>
          <Box title="List of spaces" type="primary">
            <input type="text" className="form-group form-control" placeholder="Search Spaces ..." />
            <Button type="primary" text="Add New Space" onClick={this.addSpace} />
            <div className="form-group"></div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Space Name</th>
                    <th># Views</th>
                    <th># Applicants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Image</td>
                    <td>Space One</td>
                    <td>100</td>
                    <td>90</td>
                    <td><Button type="success" text="Share" /> <Button type="primary" text="View/Edit" /></td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>Space two</td>
                    <td>100</td>
                    <td>100</td>
                    <td><Button type="success" text="Share" /> <Button type="primary" text="View/Edit" /></td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>Space Three</td>
                    <td>100</td>
                    <td>90</td>
                    <td><Button type="success" text="Share" /> <Button type="primary" text="View/Edit" /></td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>Space Four</td>
                    <td>100</td>
                    <td>120</td>
                    <td><Button type="success" text="Share" /> <Button type="primary" text="View/Edit" /></td>
                  </tr>
                  <tr>
                    <td>Image</td>
                    <td>Space Five</td>
                    <td>1300</td>
                    <td>90</td>
                    <td><Button type="success" text="Share" /> <Button type="primary" text="View/Edit" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
        </Col>
      </Row>
    </Content>);
  }
}

class SpaceAdd extends Component {
  addSpace(event) {
    event.preventDefault();

    console.log('click on space');
    window.location.href = "/dashboard";
  }
  
  state = {}
  render() {
    const { errors, formValid } = this.state;
    return (<Content title="SpaceAdd" subTitle="Add new Space" browserTitle="Zev Rector :: Spacesasd">
      <Row>
        {/* <Col xs={12}>
          <Box title="List of spaces" type="primary">
            <input type="text" className="form-group form-control" placeholder="Search Spaces ..." />
            <Button type="primary" text="Add New Space" onClick={this.addSpace} />
            <div className="form-group"></div>
          </Box>
        </Col> */}
        {/* <Col sm={3}></Col> */}
        <Col xs={12}>
          <Box title="Add New Space" type="primary">
            <form  className="">
              {/* <h3 className="mb-3 tx-semibold text-center">Get Started</h3> */}
              <div className="form-group">
                <Text type="text" placeholder="Space Name" sm={12} name="space_name" labelSm="0" /* onChange={this.handleChange} */ required noValidate />
                {/* {errors.firstname.length > 0 &&
                  <span className='error pr-15 text-right text-danger d-block'>{errors.firstname}</span>} */}
              </div>
              <div className="form-group">
                <textarea className="form-control" sm={12} style={{resize: "none", width: '100%'}} placeholder="Description" name="description"  noValidate ></textarea>
                {/* {errors.lastname.length > 0 &&
                  <span className='error pr-15 text-right text-danger d-block'>{errors.lastname}</span>} */}
              </div>
              <div className="form-group has-text">
                <div className="form-group col-sm-12">
                  {/* <div className="input-group"> */}
                  <Text type="text" placeholder="City" sm={12} name="city" labelSm="0" /* onChange={this.handleChange} */ required noValidate />
                  {/* </div> */}
                  {/* {errors.phone.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.phone}</span>} */}
                </div>
              </div>

              <div className="form-group has-text">
                <div className="form-group col-sm-12">
                  <div className="input-group">
                    <input type="number" pattern="[0-9]" className="form-control" placeholder="No. of balconies" name="no_of_balconies" /* onChange={this.handleChange} */ noValidate />
                  </div>
                  {/* {errors.brokerage.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.brokerage}</span>} */}
                </div>
              </div>

              <div className="form-group has-email"><label className="control-label col-sm-0"></label>
                <div className="form-group col-sm-12 col-sm-offset-0">
                  <div className="input-group">
                    <input type="text" /* onChange={this.handleChange} */ noValidate  className="form-control" name="balconies_space" placeholder="Balconies Space" />
                  </div>
                  {/* {errors.email.length > 0 &&
                  <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>} */}
                </div>
              </div>
                {/* <Select iconLeft="fa-user-tag" defaultValue="manager" sm="12" labelSm="0" options={['Admin', 'Manager']} placeholder="User Type" title="User Type">
                </Select> */}

                <div className="form-group has-password">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <input type="number" className="form-control" name="no_of_bedrooms" /* onChange={this.handleChange} */ noValidate placeholder="No. of Bedrooms" />
                    </div>
                    {/* {errors.password.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                  </div>
                </div>
                <div className="text-center">  <Button text="Submit" className="mx-15 mt-15 bg-gradient tx-white register-button" /> {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''}</div>
            </form>
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
          <Box title="List of Applicants" type="primary">
            <input type="text" className="form-group form-control" placeholder="Search Applicants ..." />
            <div className="form-group"></div>
            <div className="table-responsive">
              <table className="table table-striped applicant-list">
                <thead>
                  <tr>
                    <th>Applicant Name</th>
                    <th>Space Name</th>
                    <th>Reports</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kevin Parker</td>
                    <td>Space One</td>
                    <td><a href="/applicants">Report Link</a></td>
                    <td>
                      <span className="asent"><i className="fa fa-paper-plane-o"></i> Sent</span>
                      <span className="aopen"><i className="fa fa-envelope-open-o"></i> Opened</span>
                      <span className="acomp"><i className="fa fa-thumbs-o-up"></i> Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ted Parker</td>
                    <td>Space Three</td>
                    <td><a href="/applicants">Report Link</a></td>
                    <td>
                      <span className="asent"><i className="fa fa-paper-plane-o"></i> Sent</span>
                      <span className="aopen"><i className="fa fa-envelope-open-o"></i> Opened</span>
                      <span className="acomp"><i className="fa fa-thumbs-o-up"></i> Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Kenny G</td>
                    <td>Space One</td>
                    <td><a href="/applicants">Report Link</a></td>
                    <td>
                      <span className="asent"><i className="fa fa-paper-plane-o"></i> Sent</span>
                      <span className="aopen"><i className="fa fa-envelope-open-o"></i> Opened</span>
                      <span className="acomp"><i className="fa fa-thumbs-o-up"></i> Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ben Parker</td>
                    <td>Space One</td>
                    <td><a href="/applicants">Report Link</a></td>
                    <td>
                      <span className="asent"><i className="fa fa-paper-plane-o"></i> Sent</span>
                      <span className="aopen"><i className="fa fa-envelope-open-o"></i> Opened</span>
                      <span className="acomp"><i className="fa fa-thumbs-o-up"></i> Completed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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