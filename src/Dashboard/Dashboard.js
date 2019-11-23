import React, { Component } from 'react';
import AdminLTE, { Sidebar, Content, Row, Col, Box, Button, Inputs } from 'adminlte-2-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, useParams } from 'react-router-dom'
import ImageUploader from 'react-images-upload';
//import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import './dashboard.css';
const { Select2, Date, DateTime, Text } = Inputs;
var JSAlert = require("js-alert");

const { Item, Header } = Sidebar;
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
        <SpaceSingle path="/space/:spaceId" />
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
  constructor() {
    super();
    this.state = {
      spaces: []
    };
    this.moveToSpace = this.moveToSpace.bind(this)
  }
  addSpace(event) {
    event.preventDefault();

    window.location.href = "/spaces_add";
  }
  moveToSpace(spaceId) {
    // event.preventDefault();
    // move to single space
    console.log('event', spaceId)
     debugger
    // window.location.href = '/space/' + event.target;

  }

  componentDidMount() {
    // Get all Spaces
    fetch('http://localhost:3001/api/space/get', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.status) {
        this.setState({
          spaces: data.result
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  
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
                    {/* <th>Space Status</th> */}
                    <th>Space Type</th>
                    <th># Views</th>
                    <th># Applicants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.spaces.map((space, index) => (
                    <tr>
                      <td>Image</td>
                      <td>{space.space_name}</td>
                      {/* <td>{space.space_status}</td> */}
                      <td>{space.space_type}</td>
                      <td>100</td>
                      <td>90</td>
                      <td>
                        <Button type="success" text="Share" />
                        <Button className="ml-3" type="primary" text="View/Edit" to={`/space/${space.id}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        </Col>
      </Row>
    </Content>);
  }
}

class SpaceSingle extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      space: '',
      status: false
    };
  }
  componentDidMount() {

    // let { spaceId } = useParams();
    const { match: { params } } = this.props;

    // Get single Space
    fetch(`http://localhost:3001/api/space/${params.spaceId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.status) {
        this.setState({
          space: data.result[0],
          status: data.status
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    let space_status = this.state.status;
    let space = {};
    if(space_status) {
      space = this.state.space;
    }
    
    return (
      <Content title="Space" subTitle={space.space_name} browserTitle="Zev Rector :: Spaces">
        {/* {space_status ? ( */}
        <Row>
          <Col xs={12}>
            <Box title={space.space_name} type="primary">
              <div className="table-responsive">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th>Image</th>
                      <td>Image</td>
                    </tr>
                    <tr>
                      <th>Space Name</th>
                      <td>{space.space_name}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{space.description}</td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td>{space.city}</td>
                    </tr>
                    <tr>
                      <th>Space Type</th>
                      <td>{space.space_type}</td>
                    </tr>
                    <tr>
                      <th>No of Balconies</th>
                      <td>{space.no_of_balconies}</td>
                    </tr>
                    <tr>
                      <th>Balconies Space</th>
                      <td>{space.balconies_space}</td>
                    </tr>
                    <tr>
                      <th>No of Bedrooms</th>
                      <td>{space.no_of_bedrooms}</td>
                    </tr>
                    <tr>
                      <th>no of Bathrooms</th>
                      <td>{space.no_of_bathrooms}</td>
                    </tr>
                    <tr>
                      <th>No of Garages</th>
                      <td>{space.no_of_garages}</td>
                    </tr>
                    <tr>
                      <th>No of Parkings</th>
                      <td>{space.no_of_parkings}</td>
                    </tr>
                    <tr>
                      <th>Pets Allowed</th>
                      <td>{space.pets_allowed ? "Yes" : "No"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Box>
          </Col>
        </Row> 
        {/* ) : (
          <Redirect to="/spaces" />
        ) } */}
      </Content>
    );
  }
}

class SpaceAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space_name: '',
      description: '',
      city: '',
      space_status: '',
      space_type: '',
      no_of_balconies: 0,
      balconies_space: '0.00',
      no_of_bedrooms: 0,
      no_of_bathrooms: 0,
      no_of_garages: 0,
      no_of_parkings: 0,
      space_image: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      space_image: this.state.space_image.concat(picture),
    });
  }

  handleChange(event) {
    event.preventDefault();

    const {name, value} = event.target;
    switch(name) {
      case 'space_name':
        this.setState({ space_name: value });
        break;
      case 'description':
        this.setState({ description: value });
        break;
      case 'city':
        this.setState({ city: value });
        break;
      case 'space_status':
        this.setState({ space_status: value });
        break;
      case 'space_type':
        this.setState({ space_type: value });
        break;
      case 'no_of_balconies':
        this.setState({ no_of_balconies: value });
        break;
      case 'balconies_space':
        this.setState({ balconies_space: value });
        break;
      case 'no_of_bedrooms':
        this.setState({ no_of_bedrooms: value });
        break;
      case 'no_of_bathrooms':
        this.setState({ no_of_bathrooms: value });
        break;
      case 'no_of_garages':
        this.setState({ no_of_garages: value });
        break;
      case 'no_of_parkings':
        this.setState({ no_of_parkings: value });
        break;
      default:
        break;
    }

  }

  handleSubmit(event) {
    event.preventDefault();

    var formData = {
      space_name      : this.state.space_name,
      description     : this.state.description,
      city            : this.state.city,
      image_url       : this.state.space_image,
      space_status    : this.state.space_status,
      space_type      : this.state.space_type,
      no_of_balconies : this.state.no_of_balconies,
      balconies_space : this.state.balconies_space,
      no_of_bedrooms  : this.state.no_of_bedrooms,
      no_of_bathrooms : this.state.no_of_bathrooms,
      no_of_garages   : this.state.no_of_garages,
      no_of_parkings  : this.state.no_of_parkings,
    };

    fetch('http://localhost:3001/api/space/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(res => {
      console.log(res);
      if( res.status ) {
        JSAlert.alert("Space successfully added").then(function() {
          window.location.href = "/spaces";
        });
      }
    }).catch(err => {
      console.log(err);
      console.log(err.status);
    })
    
  }

  render() {
    const { errors, formValid } = this.state;
    return (<Content title="Space" subTitle="Add new Space" browserTitle="Zev Rector :: Add new Space">
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
            <form id="myForm" className="add-space-form">

              <div className="form-group has-text">
                <label>Space Image</label>
                <ImageUploader
                  name="space_image"
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  singleImage={true}
                  withPreview={true}
                />
              </div>

              <Text label="Space Name" labelPosition="above" type="text" placeholder="Space Name" sm={12} name="space_name" onChange={(e) => this.handleChange(e)} required noValidate />
              {/* {errors.firstname.length > 0 &&
                <span className='error pr-15 text-right text-danger d-block'>{errors.firstname}</span>} */}

              <div className="form-group has-text">
                <label>Description</label>
                <textarea className="form-control" style={{resize: "none", width: "100%", height: "80px"}} placeholder="Description" name="description" onChange={(e) => this.handleChange(e)} noValidate />
                {/* {errors.lastname.length > 0 &&
                  <span className='error pr-15 text-right text-danger d-block'>{errors.lastname}</span>} */}
              </div>
              
              <Text label="City" labelPosition="above" type="text" placeholder="City" sm={12} name="city" onChange={(e) => this.handleChange(e)} required noValidate />
              {/* {errors.phone.length > 0 &&
                <span className='error pr-15 text-right text-danger d-block'>{errors.phone}</span>} */}

              <Row>
                <Col sm={6}>
                  <Text label="Space Status" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate  className="form-control" name="space_status" />
                </Col>
                <Col sm={6}>
                  <Text label="Space Type" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate  className="form-control" name="space_type" />
                  {/* {errors.email.length > 0 &&
                  <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>} */}
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <div className="form-group has-text">
                    <label>No of Balconies</label>
                    <div className="input-group">
                      <input type="number" pattern="[0-9]" className="form-control" placeholder="No. of balconies" name="no_of_balconies" onChange={ (e) => this.handleChange(e) } noValidate />
                    </div>
                    {/* {errors.brokerage.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.brokerage}</span>} */}
                  </div>
                </Col>
                <Col sm={6}>                    
                    <Text label="Balconies Space" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate  className="form-control" name="balconies_space" placeholder="Balconies Space" />
                    {/* {errors.email.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>} */}
                </Col>
              </Row>
              {/* <Select iconLeft="fa-user-tag" defaultValue="manager" sm="12" labelSm="0" options={['Admin', 'Manager']} placeholder="User Type" title="User Type">
                    </Select> */}
              
              <Row>
                <Col sm={3}>
                  <div className="form-group">
                    <label>No of Bedrooms</label>
                    <div className="input-group">
                      <input type="number" className="form-control" name="no_of_bedrooms" onChange={(e) => this.handleChange(e)} noValidate />
                    </div>
                    {/* {errors.password.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                  </div>
                </Col>
                <Col sm={3}>
                  <div className="form-group">
                    <label>No of Bathrooms</label>
                    <div className="input-group">
                      <input type="number" className="form-control" name="no_of_bathrooms" onChange={(e) => this.handleChange(e)} noValidate />
                    </div>
                    {/* {errors.password.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                  </div>
                </Col>
                <Col sm={3}>
                  <div className="form-group">
                    <label>No of Garages</label>
                    <div className="input-group">
                      <input type="number" className="form-control" name="no_of_garages" onChange={(e) => this.handleChange(e)} noValidate />
                    </div>
                    {/* {errors.password.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                  </div>
                </Col>
                <Col sm={3}>
                  <div className="form-group">
                    <label>No of Parkings</label>
                    <div className="input-group">
                      <input type="number" className="form-control" name="no_of_parkings" onChange={(e) => this.handleChange(e)} noValidate />
                    </div>
                    {/* {errors.password.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>} */}
                  </div>
                </Col>
              </Row>
              

              {/* <Box > */}
              <div style={{ padding: "15px 0" }}>
                <Button text="Publish" onClick={this.handleSubmit} size="lg" type="primary" className=" tx-white " />
                {/* {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''} */}
              </div>
              {/* </Box> */}
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