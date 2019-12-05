import React, { Component } from 'react';
import API from '../Common/API';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import { Redirect } from 'react-router-dom'
import AdminLTE, { Sidebar, Content, Row, Col, Box, Button, Inputs } from 'adminlte-2-react';
import ImageUploader from 'react-images-upload';
import SearchBar from '../Components/Modules/SearchBar';
import DashboardHome from './DashboardHome';
const { Text } = Inputs;
const { Item } = Sidebar;
//import {Container,Row,Col,Form,Button} from 'react-bootstrap';
var JSAlert = require("js-alert");

export default class Dashboard extends Component {
  constructor() {
    super();
    console.log('I am still here');
  }
  
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


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} }
    this.api = new API();
  }

  componentDidMount() {
    this.api.getCurrentUserData().then(
      res => res.json()
    ).then(userData => {
      this.setState({ user: userData.result });
    }).catch(err => {
      console.log('ERR: ', err);
    })
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      avatarUpdated: false
    });
  }

  fileSubmitHandler = () => {
    const avatarData = new FormData();
    avatarData.append('avatar', this.state.selectedFile, this.state.selectedFile.name, {
      onUploadProgress: ProgressEvent => {
        console.log( `Upload Progress: ${Math.round( ProgressEvent.loaded / ProgressEvent.total * 100 )}` );
      }
    });

    this.api.uploadAvatar( avatarData ).then(res => {
      return res.json()
    }).then(data => {
      console.log('up', data);
    }).catch(err => {
      console.log('Upload ERR: ', err);
    })
  }
  
  render() {
    const user = this.state.user;
    return (<Content title="Profile" subTitle="Manager Profile" browserTitle="Zev Rector :: Manager Profile">
      <Row>
        <Col xs={12}>
          <Box title="Profile" type="primary">
            <Col xs={{span:8,offset:2}} className="text-center">
              <div className="userDP" onClick={() => this.fileInput.click()}>
                {user.image ? (
                  <img className="avatar" alt="avatar" src={this.api.avatarUrl + user.image} />
                ) : (
                  <i className="fa fa-user user"></i>
                ) }
              </div>
              <input
                type="file"
                style={{display: 'none'}}
                onChange={this.fileSelectedHandler}
                ref={fileInput => this.fileInput = fileInput} />
              
              <button onClick={this.fileSubmitHandler}>Upload</button>
              <div className="userName">
                {/* <input type="text" name="username" value="Kevin Parker" readOnly="true" />  */}
                {user.firstname}
                {user.lastname ? ` ${user.lastname}` : ''}
                <i className="fa fa-pencil"></i>
              </div>
              {/* <Button type="primary" text="Save" /> */}
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
    this.api = new API();
  }
  addSpace(event) {
    event.preventDefault();

    window.location.href = "/spaces_add";
  }

  componentDidMount() {
    // Get all Spaces
    this.api.getMySpaces().then(
      res => res.json()
    ).then(data => {
      if(data.status) {
        console.log('spaces', data)
        this.setState({
          spaces: data.result
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  // Callback return
  onSearchSubmit = (term) => {

    // API - Search spaces
    this.api.searchMySpaces(term).then(
      res => res.json()
    ).then(search => {
      if(search.status) {
        this.setState({ spaces: search.result })
      }
    }).catch(err => {
      console.log(err);
    })

  }
  
  render() {
    return (<Content title="Spaces" subTitle="Spaces" browserTitle="Zev Rector :: Spaces">
      <Row>
        <Col xs={12}>
          <Box title="List of spaces" type="primary">
            <SearchBar onSubmit={this.onSearchSubmit} placeholder="Search Spaces..." />
            <Button type="primary" text="Add New Space" onClick={this.addSpace} />
            <div className="form-group"></div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Space Name</th>
                    <th>Space Status</th>
                    <th>Space Type</th>
                    <th># Views</th>
                    <th># Applicants</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.spaces.map((space, index) => (
                    <tr key={space.id}>
                      <td>Image</td>
                      <td>{space.space_name}</td>
                      <td>{space.space_status}</td>
                      <td>{space.space_type}</td>
                      <td>{space.views}</td>
                      <td>{space.applicants}</td>
                      <td>{space.price}</td>
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
      status: false,
      applicants: [],
      applicantsStatus: false
    };
    this.api = new API();
  }
  componentDidMount() {
    const { match: { params: { spaceId } } } = this.props;

    // Get single Space
    this.api.getMySpaces(spaceId)
    .then(res => res.json())
    .then(data => {
      if(data.status) {
        console.log('single', data)

        // Get Applicants for single space
        if (data.status) {
          
          this.api.getMyApplicantsBySpaceId( data.result.id ).then(
            response => response.json()
          ).then(appl => {
            if(appl.status) {
              this.setState({
                applicants: appl.result,
                applicantsStatus: appl.status
              })
            }
          }).catch(err => {
            console.log('ERR: ', err);
          })
        }

        this.setState({
          space: data.result,
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
    const statusConfig = {
      Sent: {
        spanClass: 'asent',
        iconName: 'fa-paper-plane-o'
      },
      Opened: {
        spanClass: 'aopen',
        iconName: 'fa-envelope-open-o'
      },
      Completed: {
        spanClass: 'acomp',
        iconName: 'fa-thumbs-o-up'
      }
    };
    
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

        {/* Show Applicants */}
        {(!this.state.applicantsStatus) && this.state.applicants.length === 0 ? '' : (
          <Row>
            <Col xs={12}>
              <Box title="List of Applicants" type="secondarys">
                <div className="table-responsive">
                  <table className="table table-striped applicant-list">
                    <thead>
                      <tr>
                        <th>Applicant Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Reports</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.applicants.map((applicant, index) => (
                        <tr key={index}>
                          <td>{applicant.firstname} {applicant.lastname ? applicant.lastname : ''}</td>
                          <td>{applicant.email}</td>
                          <td>{applicant.phone}</td>
                          <td><a href="/applicants">Report Link</a></td>
                          <td>
                            <span className={statusConfig[applicant.status].spanClass}>
                              <i className={`mr-2 fa ${statusConfig[applicant.status].iconName}`}></i>
                              {applicant.status}
                            </span>
                          </td>
                        </tr>
                      ) )}
                    </tbody>
                  </table>
                </div>
              </Box>
            </Col>
          </Row>
        ) }

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
      price: '0.00',
      space_status: '',
      space_type: '',
      no_of_balconies: 0,
      balconies_space: '0.00',
      no_of_bedrooms: 0,
      no_of_bathrooms: 0,
      no_of_garages: 0,
      no_of_parkings: 0,
      gallery: null,
    };
    this.imageUrl = '';
    this.api = new API();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    // set state with updated gallery
    this.setState({
      gallery: picture,
      loaded: 0,
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
      case 'price':
        this.setState({ price: value });
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
      price           : this.state.price,
      space_status    : this.state.space_status,
      space_type      : this.state.space_type,
      no_of_balconies : this.state.no_of_balconies,
      balconies_space : this.state.balconies_space,
      no_of_bedrooms  : this.state.no_of_bedrooms,
      no_of_bathrooms : this.state.no_of_bathrooms,
      no_of_garages   : this.state.no_of_garages,
      no_of_parkings  : this.state.no_of_parkings,
      user_id         : this.api.currentUserId
    };

    const uploadData = new FormData()

    for (let x = 0; x < this.state.gallery.length; x++) {
      uploadData.append ('file', this.state.gallery[x]);
    }
    
    this.api.uploadSpaceImage(uploadData)
    .then(res => {
      return res.json()
    }).then(uploaded => {
      if(uploaded.result !== undefined) {
        
        this.imageUrl = uploaded.result.map(res => {
          return encodeURI (res.filename)
        });
        formData.gallery = JSON.stringify(this.imageUrl);

        // Add new space with image url
        this.api.addSpace(formData).then(
          res => res.json()
        ).then(data => {
          console.log(data);
          if( data.status ) {
            JSAlert.alert("Space successfully added").then(function() {
              window.location.href = "/spaces";
            });
          }
        }).catch(err => {
          console.log(err);
          console.log(err.status);
        });

      }
    }).catch(err => {
      console.log('Upload ERR: ', err);
    });
    
  }

  render() {
    // const { errors, formValid } = this.state;
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
                  label="Max file size: 5mb, accepted: jpg|gif|png, Dimesion: 3:2"
                  name="gallery"
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png']}
                  maxFileSize={5242880}
                  singleImage={false}
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
              
              <Row>
                <Col sm={6}>
                  <Text label="City" labelPosition="above" type="text" placeholder="City" sm={12} name="city" onChange={(e) => this.handleChange(e)} required noValidate />
                </Col>
                <Col sm={6}>
                  <Text label="Price" labelPosition="above" type="text" onChange={(e) => this.handleChange(e)} noValidate  className="form-control" name="price" />
                </Col>
              </Row>
              
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
  constructor() {
    super()
    this.state = {
      applicants: [],
      status: false
    };
    this.api = new API();
  }

  componentDidMount() {
    this.api.getMyApplicants().then(
      res => res.json()
    ).then(data => {
      console.log('app', data);
      if(data.status) {
        this.setState({
          applicants: data.result,
          status: data.status
        })
      }
    }).catch(err => {
      console.log('ERR: ', err);
    })
  }

  // Callback return
  onSearchSubmit = (term) => {

    // API - Search applicants
    this.api.searchMyApplicants(term).then(
      res => res.json()
    ).then(search => {
      if(search.status) {
        this.setState({ applicants: search.result })
      }
    }).catch(err => {
      console.log(err);
    })

  }
  
  render() {
    const statusConfig = {
      Sent: {
        spanClass: 'asent',
        iconName: 'fa-paper-plane-o'
      },
      Opened: {
        spanClass: 'aopen',
        iconName: 'fa-envelope-open-o'
      },
      Completed: {
        spanClass: 'acomp',
        iconName: 'fa-thumbs-o-up'
      }
    };
    
    return (
      <Content title="Applicants" subTitle="Applicants" browserTitle="Zev Rector :: Applicants">
        <Row>
          <Col xs={12}>
            <Box title="List of Applicants" type="primary">
              <SearchBar onSubmit={this.onSearchSubmit} placeholder="Search Applicants..." />
              <div className="form-group"></div>
              <div className="table-responsive">
                <table className="table table-striped applicant-list">
                  <thead>
                    <tr>
                      <th>Applicant Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Space Name</th>
                      <th>Space Type</th>
                      <th>Reports</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.applicants.map((applicant, index) => (
                      <tr key={index}>
                        <td>{applicant.firstname} {applicant.lastname ? applicant.lastname : ''}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.phone}</td>
                        <td>{applicant.space_name}</td>
                        <td>{applicant.space_type}</td>
                        <td><a href="/applicants">Report Link</a></td>
                        <td>
                          <span className={statusConfig[applicant.status].spanClass}>
                            <i className={`mr-2 fa ${statusConfig[applicant.status].iconName}`}></i>
                            {applicant.status}
                          </span>
                        </td>
                      </tr>
                    ) )}
                  </tbody>
                </table>
              </div>
            </Box>
          </Col>
        </Row>
      </Content>
    );
  }
}

class Logout extends Component {
  constructor(props) {
    super(props);

    if( localStorage.getItem('login') ) {
      localStorage.clear();
      this.state = {
        loggedOut: localStorage.getItem('login') ? false : true
      };
    }
    
  }
  componentDidMount() {
    console.log(localStorage.getItem('login'));
    this.setState({
      loggedOut: localStorage.getItem('login') ? false : true
    });
  }
  render() {
    if(this.state.loggedOut || !localStorage.getItem('login')) {
      window.location.reload(false);
      return <Redirect to='/admin' />
    }

    return <Redirect to={'/dashboard'} />
  }
}