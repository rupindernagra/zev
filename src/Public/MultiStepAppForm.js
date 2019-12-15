import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
// import UserDetails from './UserDetails';
// import PersonalDetails from './PersonalDetails';
// import Confirmation from './Confirmation';
// import Success from './Success';
// import { fadeInUp, fadeInDown } from 'react-animations';
// import Radium, { StyleRoot } from 'radium';

// const styles = {
//   fadeInUp: {
//     animation: 'x 1s',
//     animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
//   },
//   fadeInDown: {
//     animation: 'x 1s',
//     animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
//   }
// }


export default class MultiStepAppForm extends Component {
    state = {
        step: 1,
        // animation: styles.fadeInUp,
        // crntAnim: null,
        progressComplete: 0,
        firstName: '',
        lastName: '',
        email: '',
        // age: '',
        // city: '',
        // country: '',
        formErrors: {firstName: '', email: '', phone: ''},
        firstNameValid: false,
        emailValid: false,
        // phoneValid: false,
        formValid: false
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        })
    }

    handleChange = input => event => {
        // console.log('input', input);
        // console.log('event', event);
        const { value } = event.target;
        this.setState(
            { [input]: event.target.value },
            () => { this.validateField(input, value) }
        )
    }

    validateField(fieldName, value) {
        console.log('field', fieldName);
        console.log('val', value);
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let emailValid = this.state.emailValid;
        // let phoneValid = this.state.phoneValid;
        let progressComplete = this.state.progressComplete;
      
        switch(fieldName) {
            case 'firstName':
                firstNameValid = value.length >= 3;
                fieldValidationErrors.firstName = firstNameValid ? '' : ' is not valid';
                // progressComplete = firstNameValid ? (progressComplete + 50) : 0;
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                // progressComplete = emailValid ? (progressComplete + 50) : 0;
                break;
            // case 'phone':
            //     phoneValid = value.length >= 10;
            //     fieldValidationErrors.phone = phoneValid ? '': ' is too short';
            //     break;
            default:
                break;
        }
        console.log(firstNameValid);
        console.log(emailValid);
        progressComplete = firstNameValid + emailValid;
        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            emailValid: emailValid,
            progressComplete: progressComplete
            // phoneValid: phoneValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.firstNameValid && this.state.emailValid });
    }

    // componentDidUpdate(prevProps, prevState) {
    //     // console.log('prevState', prevState);
    //     // console.log('this.state', this.state);
    //     if (prevState.step < this.state.step) {
    //         console.log('Next Click; Up slide')
    //         // Next Click; Up slide
    //         this.setState({ animation: styles.fadeInUp });
    //     }
    //     if (prevState.step > this.state.step) {
    //         console.log('Prev Click; Down slide')
    //         // Prev Click; Down slide
    //         this.setState({ animation: styles.fadeInDown });
    //     }
    // }

    render() {
        console.log(this.state.progressComplete)
        const { step } = this.state;
        const { firstName, email } = this.state;
        const values = { firstName, email };
        switch (step) {
            case 1:
                console.log('in 1')
                this.viewScreen = 
                    // <StyleRoot>
                    //     <div className="test" style={this.state.animation}>
                            <UserDetails
                                nextStep={this.nextStep}
                                handleChange={this.handleChange}
                                values={values}
                            />
                        {/* </div>
                    </StyleRoot> */}
            
                break;
            case 2:
                console.log('in 2')
                this.viewScreen = 
                    // <StyleRoot>
                    //     <div className="test" style={this.state.animation}>
                            <PersonalDetails
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                handleChange={this.handleChange}
                                values={values}
                            />
                        {/* </div>
                    </StyleRoot> */}
                break;
            default:
                return false;
                break;
            // case 3:
            //     return <Confirmation 
            //             nextStep={this.nextStep}
            //             prevStep={this.prevStep}
            //             values={values}
            //             />
            // case 4:
            //     return <Success />
        }
        return (
            <>
                <ProgressBar now={this.state.progressComplete} />
                {this.viewScreen}
            </>
        )
    }
}

// 

class UserDetails extends Component {

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render() {
        const { values } = this.props;
        return (
            <form className="ui form">
                <h1 className="ui centered">Enter User Details</h1>
                <div className="field">
                    <label>First Name</label>
                    <input
                        placeholder='First Name'
                        onChange={this.props.handleChange('firstName')}
                        defaultValue={values.firstName}
                    />
                </div>
                <button onClick={this.saveAndContinue}>Save And Continue </button>
            </form>
        )
    }
}


class PersonalDetails extends Component {
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values } = this.props
        return (
            <form className="ui form">
                <h1 className="ui centered">Enter Personal Details</h1>
                <div className="field">
                    <label>Email Address</label>
                    <input
                        type='email'
                        placeholder='Email Address'
                        onChange={this.props.handleChange('email')}
                        defaultValue={values.email}
                    />
                </div>
                <button onClick={this.back}>Back</button>
                <button onClick={this.saveAndContinue}>Save And Continue </button>
            </form>
        )
    }
}