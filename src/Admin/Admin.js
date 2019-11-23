import React, { Component } from 'react';
//import { Row, Col, Inputs, Button } from 'adminlte-2-react'; // can use in other pages for layout
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Link } from 'react-router-dom';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import './admin-login.css';
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
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      validateUser: null,
      errors: {
        email: '',
        password: '',
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;   
    switch (name) {
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
    this.setState({formValid: validateForm(this.state.errors)});
    this.setState({errorCount: countErrors(this.state.errors)});
  }

  render() {
    if(localStorage.getItem('login')){
      return <Redirect to='/dashboard' />
    }
    const { errors } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{span:4, offset:4}} xs={{span:8, offset:2}}>
          <Form className="admin-login">
          <h1 className="text-center">Login</h1>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email"  onChange={this.handleChange} noValidate />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              {errors.email.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} noValidate />
              {errors.password.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <div className="text-center">
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                  Login
                </Button>
                {/* {this.state.errorCount !== null ? <p className="form-status text-center">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''} */}
                {this.state.validateUser !== null ? <p className="form-status alert alert-danger text-center">Invalid User Credentials</p> : ''}
              </div>
            </Form.Group>
            <Link to="/forgot-password">Forgot password?</Link>
          </Form>

          </Col>
        </Row>
      </Container>
    )
  }
    
  handleSubmit(event) {
    event.preventDefault();

    if(this.state.formValid === false) {
      return false;
    }

    var formData = {
      email: this.state.email,
      password: this.state.password
    }

    fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(
      res => res.json()
    ).then(data => {
      console.log('data', data);
      if(data.status) {
        this.setState({validateUser: null});
        localStorage.setItem('login',true);
      } else {
        console.log("check");
        this.setState({validateUser: true});
      }
    }).catch(err => {
      console.log(err);
      console.log(err.status);
    })

  }

}
