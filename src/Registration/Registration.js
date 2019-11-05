import React, { Component } from 'react';
import { Row, Col, Inputs, Button } from 'adminlte-2-react';
import '../App.css';
import './registration.css';
const { Text } = Inputs;
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


export default class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      errors: {
        firstname: '',
        lastname: '',
        email: '',
        brokerage:'',
        phone: '',
        password: '',
      }
    };
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
    return (
      <div className="registration">
        <div className="container">
          <Row>
            <Col sm={3}></Col>
            <Col sm={6}>
              <form onSubmit={this.handleSubmit} className="reg-form">
                <h3 className="mb-3 tx-semibold text-center">Registration Form</h3>
                <div className="form-group">
                  <Text type="text" placeholder="First Name" sm={12} name="firstname" labelSm="0" onChange={this.handleChange} required noValidate></Text>
                  {errors.firstname.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.firstname}</span>}
                </div>
                <div className="form-group">
                  <Text type="text" placeholder="Last Name" sm={12} name="lastname" labelSm="0" onChange={this.handleChange} noValidate></Text>
                  {errors.lastname.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.lastname}</span>}
                </div>
                <div className="form-group has-text">
                  <div className="form-group col-sm-12">
                    <div className="input-group">
                      <input type="number" pattern="[0-9]" className="form-control" placeholder="Phone" name="phone" onChange={this.handleChange} noValidate />
                    </div>
                    {errors.phone.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group has-text">
                  <div className="form-group col-sm-12">
                    <div className="input-group">
                      <input type="number" pattern="[0-9]" className="form-control" placeholder="Brokerage" name="brokerage" onChange={this.handleChange} noValidate />
                    </div>
                    {errors.brokerage.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.brokerage}</span>}
                  </div>
                </div>

                <div className="form-group has-email"><label className="control-label col-sm-0"></label>
                  <div className="form-group col-sm-12 col-sm-offset-0">
                    <div className="input-group"><input type="email" onChange={this.handleChange} noValidate  className="form-control" name="email" placeholder="Email" />
                    </div>
                    {errors.email.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>}
                  </div>
                </div>
                  {/* <Select iconLeft="fa-user-tag" defaultValue="manager" sm="12" labelSm="0" options={['Admin', 'Manager']} placeholder="User Type" title="User Type">
                  </Select> */}

                  <div className="form-group has-password">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} noValidate placeholder="Password" />
                      </div>
                      {errors.password.length > 0 &&
                        <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>}
                    </div>
                  </div>
                  <div className="text-center">  <Button text="Submit" className="mx-15 mt-15 bg-gradient tx-white register-button" onClick={this.handleSubmit} /> {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''}</div>
              </form>
                
            </Col>
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
  }  
}
