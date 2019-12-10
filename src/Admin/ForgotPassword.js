import React, { Component } from 'react';
// import { Row, Col, Inputs, Button } from 'adminlte-2-react';
import '../App.css';
// import '../Registration/registration.css';
import './admin-login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
// const { Text } = Inputs;
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

export default class ForgotPassword extends Component {
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
			default:
				break;
		}

		this.setState({ errors, [name]: value });
		this.setState({ formValid: validateForm(this.state.errors) });
		this.setState({ errorCount: countErrors(this.state.errors) });
	}

	render() {
		if(localStorage.getItem('login')){
      return <Redirect to='/admin/dashboard' />
    }
    const { errors } = this.state;
		return (
			// <div className="forgot-password">
				<Container>
					<Row>
						<Col md={{span:4, offset:4}} xs={{span:8, offset:2}}>
							<Form className="admin-login">
								<h1 className="text-center">Forgot Password</h1>
								<Form.Group controlId="formBasicEmail">									
									<Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} noValidate />
									{errors.email.length > 0 &&
										<span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>}
								</Form.Group>

								<div className="text-center">
									<Button variant="primary" type="submit" onClick={this.handleSubmit}>
										Submit
									</Button>
									{/* {this.state.errorCount !== null ? <p className="form-status text-center">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''} */}
									{this.state.validateUser !== null ? <p className="form-status alert alert-danger text-center">Invalid User Credentials</p> : ''}
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			// </div>
		)
	}

	handleSubmit(event) {
    event.preventDefault();
    if(this.state.formValid===false){
      return false;
    }
    if(this.state.email==='admin@admin.com' && this.state.password==='admin123'){
      this.setState({validateUser: null});
      console.log(this.state);
      localStorage.setItem('login',true);
    }else{
      console.log("check");
      this.setState({validateUser: true});
    }
  }

}