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
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

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
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        // progressComplete = emailValid ? (progressComplete + 50) : 0;
        break;
      case "phone":
        phoneValid =
          value.length === 10 && value.match(/^\d{10}$/) ? true : false;
        fieldValidationErrors.phone = phoneValid ? "" : " is too short";
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
    const { firstName, email, phone } = this.state;
    const values = { firstName, email, phone };
    // debugger
    // const pagesNumbers = this.getPagesNumbers();

    return (
      // <div>
      //   <ReactPageScroller ref={c => this.reactPageScroller = c}>
      //     hello
      //   </ReactPageScroller>
      // </div>
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
            
          />
          <EmailField
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            style={{ padding: '15px' }}
          />
          <PhoneField
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            style={{ padding: '15px' }}
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
            <button
              onClick={this.handlePageChange.bind(this, this.state.prevPage)}
              disabled={this.state.currentPage === 0}
            >
              prev
            </button>
          </li>
          <li>
            <button
              onClick={this.handlePageChange.bind(this, this.state.nextPage)}
              disabled={this.totalPage === this.state.nextPage}
            >
              next
            </button>
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
    const { values } = this.props;
    return (
      <div className="component first-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field">
            {/* <label>First Name</label> */}
            <label>First up, what's your name?</label>
            <input
              placeholder="First Name"
              onChange={this.props.handleChange("firstName")}
              defaultValue={values.firstName}
            />
          </div>
          {/* <button onClick={this.saveAndContinue}>Save And Continue </button> */}
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

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div className="component second-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              onChange={this.props.handleChange("email")}
              defaultValue={values.email}
            />
          </div>
          {/* <button onClick={this.back}>Back</button>
          <button onClick={this.saveAndContinue}>Save And Continue </button> */}
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

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    return (
      <div className="component third-component" style={{ padding: '15px 30px' }}>
        <form className="appl-form">
          <div className="field">
            <label>Enter Phone number</label>
            <input
              type="email"
              placeholder="Phone No."
              onChange={this.props.handleChange("phone")}
              defaultValue={values.phone}
            />
          </div>
          {/* <button onClick={this.back}>Back</button>
          <button onClick={this.saveAndContinue}>Save And Continue </button> */}
        </form>
      </div>
    );
  }
}
