import React, { Component } from "react";
import ReactPageScroller from "react-page-scroller";
import { ProgressBar } from "react-bootstrap";
import "./page.css";

export default class ScrollForm extends Component {
  constructor(props) {
    super(props);
    // this.scrollToTop = this.scrollToTop.bind(this);
    this.state = {
      currentPage: null,
      prevPage: null,
      nextPage: null,
      step: 0,
      progressComplete: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      formErrors: { firstName: "", email: "", phone: "" },
      firstNameValid: false,
      emailValid: false,
      phoneValid: false,
      formValid: false
    };
    this.totalPage = 3;
  }

  nextStep = () => {
    // const { step } = this.state;
    // this.setState({
    //   step: step + 1
    // });
    this.handlePageChange(this.state.nextPage);
  };

  // prevStep = () => {
  //   // const { step } = this.state;
  //   // this.setState({
  //   //   step: step - 1
  //   // });
  //   this.handlePageChange(this.state.prevPage);
  // };

  handleChange = input => event => {
    const { value } = event.target;
    this.setState({ [input]: event.target.value }, () => {
      this.validateField(input, value);
    });
  };

  validateField(fieldName, value) {
    console.log("field", fieldName);
    console.log("val", value);
    let fieldValidationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;
    let progressComplete = this.state.progressComplete;

    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length >= 3;
        fieldValidationErrors.firstName = firstNameValid ? "" : " is not valid";
        // progressComplete = firstNameValid ? (progressComplete + 50) : 0;
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? true
          : false;
        fieldValidationErrors.email = emailValid ? "" : " Hmm…that email doesn't look valid";
        // progressComplete = emailValid ? (progressComplete + 50) : 0;
        break;
      case "phone":
        phoneValid =
          value.length === 10 && value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? true : false;
        fieldValidationErrors.phone = phoneValid ? "" : " Hmm…that phone number isn't valid";
        break;
      default:
        break;
    }
    console.log(firstNameValid);
    console.log(emailValid);
    console.log(phoneValid);
    progressComplete = (firstNameValid + emailValid + phoneValid) / this.totalPage * 100;
    this.setState(
      {
        formErrors: fieldValidationErrors,
        firstNameValid: firstNameValid,
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
        this.state.firstNameValid &&
        this.state.emailValid &&
        this.state.phoneValid
    });
  }

  handlePageChange = number => {
    console.log("click on page", number);
    if (number >= 0 && number <= this.totalPage - 1) {
      this.setState(
        {
          currentPage: number,
          prevPage: number - 1,
          nextPage: number + 1
        },
        this.testCall
      ); // set currentPage number, to reset it from the previous selected.
    }
  };

  testCall() {
    console.log("in works");
  }

  goToPage = pageNumber => {
    console.log(this.reactPageScroller);
    console.log("num", pageNumber);
    this.reactPageScroller.goToPage(pageNumber);
  };

  render() {
    console.log("page..", this.state.currentPage);
    console.log("prev page..", this.state.prevPage);
    console.log("next page..", this.state.nextPage);

    // console.log("page..", this.state.currentPage);
    console.log(this.state.progressComplete);
    const { step } = this.state;
    const { firstName, email, phone, formErrors, firstNameValid } = this.state;
    const values = { firstName, email, phone };
    // debugger
    // const pagesNumbers = this.getPagesNumbers();

    return (
      <React.Fragment>
        <ReactPageScroller
          pageOnChange={this.handlePageChange}
          customPageNumber={this.state.currentPage}
        // ref={c => this.reactPageScroller = c}
        >
          <FullNameField
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            fieldError={formErrors.firstName}
            fieldValid={firstNameValid}
          />
          <EmailField
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            fieldError={formErrors.email}
            fieldValid={firstNameValid}
          />
          <PhoneField
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            fieldError={formErrors.phone}
            fieldValid={firstNameValid}
          />
        </ReactPageScroller>

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
    console.log('first error', this.props);
    return (
      <div className="component first-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field mb-3">
            {/* <label>First Name</label> */}
            <label>First up, what's your name?</label>
            <input
              autofocus={true}
              placeholder="Type your full name here"
              onChange={this.props.handleChange("firstName")}
              defaultValue={values.firstName}
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

  // back = e => {
  //   e.preventDefault();
  //   this.props.prevStep();
  // };

  render() {
    const { values, fieldError, fieldValid } = this.props;
    return (
      <div className="component second-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field mb-3">
            <label>Great. Now what's your email, _____?</label>
            <input
              autofocus={true}
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

  // back = e => {
  //   e.preventDefault();
  //   this.props.prevStep();
  // };

  render() {
    const { values, fieldError, fieldValid } = this.props;
    return (
      <div className="component third-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field mb-3">
            <label>And your phone number?</label>
            <input
              autofocus={true}
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

const FormError = (props) => {
  return (
    <div class="error-message-box cCkTRd">
      <div data-qa="error-message-visible" color="#FFFFFF" class="text___Text-sc-1t2ribu-0-div jRGmWl">
        {props.fieldError}
      </div>
    </div>
  )
}