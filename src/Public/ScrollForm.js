import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ReactPageScroller from "react-page-scroller";
import { ProgressBar } from "react-bootstrap";
import "./page.css";
import API from "../Common/API";
import PlaidLink from 'react-plaid-link'
const JSAlert = require("js-alert");

const PLAID_PUBLIC_KEY = 'aec5a1cc5ee105b4d82ec8ec416946';

export default class ScrollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      prevPage: null,
      nextPage: null,
      progressComplete: 0,
      fullName: "",
      email: "",
      phone: "",
      message: "",
      formErrors: { fullName: "", email: "", phone: "" },
      fullNameValid: false,
      emailValid: false,
      phoneValid: false,
      messageValid: false,
      formValid: false,
      formSubmitted: false,
      loadPlaid: false
    };
    this.space_id = props.match.params.spaceId;
    this.totalPage = 5;
    this.totalFields = 4;
    this.api = new API();
  }

  nextStep = () => {
    this.handlePageChange(this.state.nextPage);
  };

  handleChange = input => event => {
    const { value } = event.target;
    this.setState({ [input]: event.target.value }, () => {
      this.validateField(input, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fullNameValid = this.state.fullNameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let messageValid = this.state.messageValid;
    let progressComplete = this.state.progressComplete;

    switch (fieldName) {
      case "fullName":
        fullNameValid = value.length >= 3;
        fieldValidationErrors.fullName = fullNameValid ? "" : " is not valid";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? true
          : false;
        fieldValidationErrors.email = emailValid ? "" : " Hmm…that email doesn't look valid";
        break;
      case "phone":
        phoneValid =
          value.length === 10 && value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? true : false;
        fieldValidationErrors.phone = phoneValid ? "" : " Hmm…that phone number isn't valid";
        break;
      case "message":
        messageValid = true
        break;
      default:
        break;
    }

    progressComplete = Math.ceil((fullNameValid + emailValid + phoneValid + messageValid) / this.totalFields * 100);
    this.setState(
      {
        formErrors: fieldValidationErrors,
        fullNameValid: fullNameValid,
        emailValid: emailValid,
        phoneValid: phoneValid,
        progressComplete: progressComplete
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.fullNameValid &&
        this.state.emailValid &&
        this.state.phoneValid
    });
  }

  handlePageChange = number => {
    if (number >= 0 && number <= this.totalPage - 1) {
      this.setState(
        {
          currentPage: number,
          prevPage: number - 1,
          nextPage: number + 1
        }
      ); // set currentPage number, to reset it from the previous selected.
    }
  };

  goToPage = pageNumber => {
    this.reactPageScroller.goToPage(pageNumber);
  };

  handleClick = (e) => {
    e.preventDefault();

    this.setState({ loadPlaid: true });
  }

  handleOnLoad = () => {
    // Optional, called when Link loads
  }

  handleOnSuccess = (token, metadata) => {    // send token to client server
    if(typeof this.space_id === 'undefined') {
      this.space_id = this.props.match.params.spaceId;
    }

    // handle formData
    let formData = {
      fullname: this.state.fullName,
      space_id: this.space_id,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.message,
    };

    const plaidPayload = {
      public_token: token,
      account_id: metadata.account_id
    };

    this.api.getPlaidAccessToken(plaidPayload)
      .then(res => res.json())
      .then(data => {
        console.log('tokenResponse..', data);

        // Stripe payment here.
        if (!data.error) {
          const stripePayload = {
            access_token: data.tokenResponse.access_token,
            account_id: metadata.account_id,
            meta: {
              plaid_item_id: data.tokenResponse.item_id,
              institution_id: metadata.institution.institution_id,
              name: formData.fullname,
              email: formData.email,
              phone: formData.phone
            },
            initial_products: ["auth", "transactions"]
          };
          this.api.stripePayment(stripePayload)
            .then(res => res.json())
            .then(payment => {
              console.log('payment', payment);

              formData.plaid_item_id = data.tokenResponse.item_id;
              formData.plaid_access_token = data.tokenResponse.access_token;

              if (!payment.error) {
                formData.stripe_payment_id = payment.charge.id;
                formData.amount = Number(payment.charge.amount) / 100;
                formData.customer_id = payment.charge.customer;
                formData.receipt_url = payment.charge.receipt_url;
                formData.routing_number = payment.charge.source.routing_number;

                this.api.saveApplication(formData).then(
                  res => res.json()
                ).then(response => {
                  console.log('api status', response);
                  this.setState({ formSubmitted: true });
                }).catch(err => {
                  console.log('ERROR: ', err);
                  JSAlert.alert('Error in save data! Please try again.', '', JSAlert.Icons.Failed);
                });
              }

            })
            .catch(err => {
              console.log(err);
            })
        }

      })
      .catch(err => {
        console.log(err);
        JSAlert.alert('Error in Plaid API! Please try again.', '', JSAlert.Icons.Failed);
      });
  }

  handleOnExit = () => {
    // handle the case when your user exits Link
    console.log('in exit');
    this.setState({ loadPlaid: false });
  }

  render() {
    const {
      fullName,
      email,
      phone,
      message,
      formErrors,
      fullNameValid,
      emailValid,
      phoneValid,
      formSubmitted
    } = this.state;
    const values = { fullName, email, phone, message };

    return (
      <React.Fragment>
        <ReactPageScroller
          pageOnChange={this.handlePageChange}
          customPageNumber={this.state.currentPage}
          animationTimer={300}
          blockScrollUp={true}
          blockScrollDown={true}
        >
          <FullNameField
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            fieldError={formErrors.fullName}
            fieldValid={fullNameValid}
          />
          <EmailField
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            fieldError={formErrors.email}
            fieldValid={emailValid}
          />
          <PhoneField
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            fieldError={formErrors.phone}
            fieldValid={phoneValid}
          />
          <CommentField
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
          <div className="component first-component" style={{ padding: '15px 30px' }}>
            <div className="appl-form">
              {formSubmitted ? (
                <>
                  <h3>
                    All good, {this.state.fullName} — we've got that. <br />
                    Payment successfully done! We'll be in touch soon!
                  </h3>
                  <Link className="ui labeled icon large grey button" to={`/spaces/${this.space_id}`}>
                    <i className="left arrow icon"></i>
                    Go Back to space
                  </Link>
                </>
              ) : (
                  <PlaidLink
                    clientName="Plaid Quickstart"
                    env="sandbox"
                    product={["auth", "transactions", "assets"]}
                    publicKey={PLAID_PUBLIC_KEY}
                    userLegalName={this.state.fullName}
                    userEmailAddress={this.state.email}
                    onLoad={this.handleOnLoad}
                    onExit={this.handleOnExit}
                    onClick={this.handleClick}
                    onSuccess={this.handleOnSuccess}
                    style={{}}
                    className={`ui huge primary button ${this.state.loadPlaid && 'loading disabled'}`}
                    disabled={!this.state.formValid}>
                    Submit and connect a bank account
                  </PlaidLink>
                )}
            </div>
          </div>
        </ReactPageScroller>

        {formSubmitted ? null : (
          <ul className="pagination-additional-class pagination">
            <li className="progress-report">
              <ProgressBar
                style={{ width: "150px" }}
                now={this.state.progressComplete}
              />
            </li>
            <li>
              <div className="ui buttons">
                <button
                  className={`ui left attached icon primary button ${this.state.currentPage === 0 && 'disabled'}`}
                  onClick={this.handlePageChange.bind(this, this.state.prevPage)}
                  disabled={this.state.currentPage === 0}
                >
                  <i className="up chevron icon"></i>
                </button>
                <button
                  className={`ui right attached icon primary button ${this.totalPage === this.state.nextPage && 'disabled'}`}
                  onClick={this.handlePageChange.bind(this, this.state.nextPage)}
                  disabled={this.totalPage === this.state.nextPage}
                >
                  <i className="down chevron icon"></i>
                </button>
              </div>
            </li>
          </ul>
        )}
      </React.Fragment>
    );
  }
}

class FullNameField extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, fieldError, fieldValid } = this.props;

    return (
      <div className="component first-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form" onSubmit={event => event.preventDefault()}>
          <div className="field mb-3">
            {/* <label>First Name</label> */}
            <label>First up, what's your name?</label>
            <input
              autoFocus
              placeholder="Type your full name here"
              onChange={this.props.handleChange("fullName")}
              defaultValue={values.fullName}
            />
          </div>
          {fieldError.length > 0 ? (
            <FormError fieldError={fieldError} />
          ) : (
              <>
                {fieldValid &&
                  <button className="ui active large button" onClick={this.saveAndContinue}>
                    OK
                  <i className="check icon right"></i>
                  </button>
                }
              </>
            )}
        </form>
      </div>
    );
  }
}

class EmailField extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, fieldError, fieldValid } = this.props;
    return (
      <div className="component second-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field mb-3">
            <label>Great. Now what's your email, _____?</label>
            <input
              type="email"
              placeholder="Type your email here"
              onChange={this.props.handleChange("email")}
              defaultValue={values.email}
            />
          </div>
          {fieldError.length > 0 ? (
            <FormError fieldError={fieldError} />
          ) : (
              <>
                {fieldValid &&
                  <button className="ui active large button" onClick={this.saveAndContinue}>
                    OK
                  <i className="check icon right"></i>
                  </button>
                }
              </>
            )}
        </form>
      </div>
    );
  }
}

class PhoneField extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, fieldError, fieldValid } = this.props;
    return (
      <div className="component third-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field mb-3">
            <label>And your phone number?</label>
            <input
              maxLength={10}
              type="tel"
              placeholder="1234567890"
              onChange={this.props.handleChange("phone")}
              defaultValue={values.phone}
            />
          </div>
          {fieldError.length > 0 ? (
            <FormError fieldError={fieldError} />
          ) : (
              <>
                {fieldValid &&
                  <button className="ui active large button" onClick={this.saveAndContinue}>
                    OK
                  <i className="check icon right"></i>
                  </button>
                }
              </>
            )}
        </form>
      </div>
    );
  }
}

class CommentField extends Component {
  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div className="component forth-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field mb-3">
            <label>Last question, what's in your mind?</label>
            <textarea
              name="message"
              placeholder="Please input message here"
              rows="2"
              onChange={this.props.handleChange("message")}
              defaultValue={values.message}
            />
          </div>
          <button className="ui active large button" onClick={this.saveAndContinue}>
            OK
            <i className="check icon right"></i>
          </button>
        </form>
      </div>
    );
  }
}

const FormError = (props) => {
  return (
    <div className="error-message-box cCkTRd">
      <div data-qa="error-message-visible" color="#FFFFFF" className="text___Text-sc-1t2ribu-0-div jRGmWl">
        {props.fieldError}
      </div>
    </div>
  )
}