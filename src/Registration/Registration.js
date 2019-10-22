import React, { Component } from 'react';
import { Row, Col, Inputs, Button } from 'adminlte-2-react';
import '../App.css';
const { Select, Text } = Inputs;
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
                <div className="form-group inner-form-group">
                  <Text type="text" iconLeft="fa-user" placeholder="First Name" sm="12" name="firstname" labelSm="0" onChange={this.handleChange} noValidate></Text>
                  {errors.firstname.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.firstname}</span>}
                </div>
                <div className="form-group inner-form-group">
                  <Text type="text" iconLeft="fa-user" placeholder="Last Name" sm="12" name="lastname" labelSm="0" onChange={this.handleChange} noValidate></Text>
                  {errors.lastname.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.lastname}</span>}
                </div>
                <div className="form-group has-text">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <span className="input-group-addon"><svg aria-hidden="true" focusable="false" data-prefix="fa"
                        data-icon="phone-alt" className="svg-inline--fa fa-phone-alt fa-w-16 " role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor"
                          d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z">
                        </path>
                      </svg>
                      </span><input type="number" pattern="[0-9]" className="form-control" placeholder="Phone" name="phone" onChange={this.handleChange} noValidate />
                    </div>
                    {errors.phone.length > 0 &&
                      <span className='error pr-15 text-right text-danger d-block'>{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group has-email"><label className="control-label col-sm-0"></label>
                  <div className="col-sm-12 col-sm-offset-0">
                    <div className="input-group"><span className="input-group-addon"><svg aria-hidden="true"
                      focusable="false" data-prefix="fa" data-icon="at" className="svg-inline--fa fa-at fa-w-16 " role="img"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor"
                        d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z">
                      </path>
                    </svg></span><input type="email" onChange={this.handleChange} noValidate  className="form-control" name="email" placeholder="Email" />
                    </div>
                    {errors.email.length > 0 &&
                    <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>}
                  </div>
                </div>
                  <Select iconLeft="fa-user-tag" defaultValue="manager" sm="12" labelSm="0" options={['Admin', 'Manager']} placeholder="User Type" title="User Type">
                  </Select>

                  <div className="form-group has-password">
                    <div className="col-sm-12">
                      <div className="input-group">
                        <span className="input-group-addon"><svg aria-hidden="true" focusable="false" data-prefix="fa" data-icon="key"
                          className="svg-inline--fa fa-key fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z">
                          </path>
                        </svg>
                        </span>
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} noValidate placeholder="Password" />
                      </div>
                      {errors.password.length > 0 &&
                        <span className='error pr-15 text-right text-danger d-block'>{errors.password}</span>}
                    </div>
                  </div>
                  <div className="text-center">  <Button text="Submit" className="mx-15 mt-15 bg-gradient tx-white" onClick={this.handleSubmit} /> {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : ''}</div>
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
