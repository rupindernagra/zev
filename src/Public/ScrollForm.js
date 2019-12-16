import React, { Component } from "react";
import ReactPageScroller from "react-page-scroller";
import { ProgressBar } from "react-bootstrap";
import "./page.css";
import API from "../Common/API";

export default class ScrollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      prevPage: null,
      nextPage: null,
      step: 0,
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
      formSubmitted: false
    };
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

  handleSubmit(e) {
    e.preventDefault();

    let formData = {
      fullname: this.state.fullName,
      space_id: 32,
      email: this.state.email,
      phone: this.state.phone,
      message: this.state.message,
    };

    this.api.saveApplication(formData).then(
      res => res.json()
    ).then(data => {
      console.log('api status', data);
      this.setState({ formSubmitted: true });
    }).catch(err => {
      console.log('ERROR: ', err);
    });
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
                <h3>All good, {this.state.fullName} — we've got that. <br />We'll be in touch soon!</h3>
              ) : (
                  <button
                    className="ui huge positive right labeled icon button"
                    onClick={(event) => this.handleSubmit(event)}
                    disabled={!this.state.formValid}
                  >
                    Submit Application
                  <i className="checkmark icon"></i>
                  </button>
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
              <div class="ui buttons">
                <button
                  class={`ui left attached icon primary button ${this.state.currentPage === 0 && 'disabled'}`}
                  onClick={this.handlePageChange.bind(this, this.state.prevPage)}
                  disabled={this.state.currentPage === 0}
                >
                  <i class="up chevron icon"></i>
                </button>
                <button
                  class={`ui right attached icon primary button ${this.totalPage === this.state.nextPage && 'disabled'}`}
                  onClick={this.handlePageChange.bind(this, this.state.nextPage)}
                  disabled={this.totalPage === this.state.nextPage}
                >
                  <i class="down chevron icon"></i>
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
        <form className="appl-form">
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
                  <button class="ui active large button" onClick={this.saveAndContinue}>
                    OK
                  <i class="check icon right"></i>
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
                  <button class="ui active large button" onClick={this.saveAndContinue}>
                    OK
                  <i class="check icon right"></i>
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
                  <button class="ui active large button" onClick={this.saveAndContinue}>
                    OK
                  <i class="check icon right"></i>
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
    const { values, fieldError, fieldValid } = this.props;
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
          <button class="ui active large button" onClick={this.saveAndContinue}>
            OK
            <i class="check icon right"></i>
          </button>
        </form>
      </div>
    );
  }
}

const FormError = (props) => {
  return (
    <div class="error-message-box cCkTRd">
      <div data-qa="error-message-visible" color="#FFFFFF" class="text___Text-sc-1t2ribu-0-div jRGmWl">
        {props.fieldError}
      </div>
    </div>
  )
}