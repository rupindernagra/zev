import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
// import { Row, Col, Inputs, Button } from 'adminlte-2-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import '../App.css';
import '../Registration/registration.css';
import API from '../Common/API';
// const { Text } = Inputs;
var JSAlert = require("js-alert");
const validEmailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count + 1)
  );
  return count;
}

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => { val.length > 0 && (valid = false) }
  );
  return valid;
}


export default class PublicSpaces extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      isRegistered: false,
      errors: {
        firstname: '',
        lastname: '',
        email: '',
        brokerage:'',
        phone: '',
        password: '',
      }
    };
    this.api = new API();
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;   
    switch (name) {
      case 'firstname':
        errors.firstname =
          value.length < 5
            ? 'First Name must be 5 characters long!' : '';
        break;
      case 'lastname':
        errors.lastname =
          value.length < 3
            ? 'Last Name must be 3 characters long!' : '';
        break;
      case 'brokerage':
          errors.brokerage =
            value.length < 1
              ? 'Please add brokerage!' : '';
          break;
      case 'phone':
        errors.phone =
          value.length < 10
            ? 'Phone must be 10 digit!' : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be 8 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  render() {
    const { errors, formValid } = this.state;
    if(localStorage.getItem('login')){
      return <Redirect to='/dashboard' />
    }
    if(this.state.isRegistered) {
      return <Redirect to='/admin' />
    }
    return (
      <div className="single_space_view">
        <div className="container">
          <Row>
            {/* <Col sm={3}></Col>
            <Col sm={6}> */}

                
            {/* </Col> */}
          </Row>
            {/* {this.props.children} */}
        </div>
        </div>
        )
      }
    
  handleSubmit(event) {
    event.preventDefault();
    this.setState({formValid: validateForm(this.state.errors)});
    this.setState({errorCount: countErrors(this.state.errors)});

    if(this.state.formValid) {
      var formData = {
        firstname : this.state.firstname,
        lastname  : this.state.lastname,
        phone     : this.state.phone,
        brokerage : this.state.brokerage,
        email     : this.state.email,
        password  : this.state.password
      }

      let _self = this;

      // Call Registeration API
      this.api.register(formData).then(
        res => res.json()
      ).then(data => {
        if( data.status ) {
          JSAlert.alert("Registered Successfully").then(function() {
            _self.setState({ isRegistered: true })
          });
        }
      }).catch(err => {
        console.log(err);
        console.log(err.status);
      });
    }

  }  
}
