import React, { Component } from 'react';
import API from '../../Common/API';
import FormErrors from './FormErrors';

export default class ApplicationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            firstname: '',
            lastname: '',
            space_id: null,
            email: '',
            phone: '',
            message: '',
            formErrors: {firstname: '', email: '', phone: ''},
            firstnameValid: false,
            emailValid: false,
            phoneValid: false,
            formValid: false
        };
        this.api = new API();
    }

    handleUserInput(e) {
        e.preventDefault();

        const {name, value} = e.target;
        this.setState(
            {[name]: value},
            () => { this.validateField(name, value) }
        );
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstnameValid = this.state.firstnameValid;
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneValid;
      
        switch(fieldName) {
            case 'firstname':
                firstnameValid = value.length >= 3;
                fieldValidationErrors.firstname = firstnameValid ? '' : ' is not valid';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'phone':
                phoneValid = value.length >= 10;
                fieldValidationErrors.phone = phoneValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstnameValid: firstnameValid,
            emailValid: emailValid,
            phoneValid: phoneValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.firstnameValid && this.state.emailValid && this.state.phoneValid });
    }
    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleSubmit(e) {
        e.preventDefault();

        let formData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            space_id: 1,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message,
        };

        this.api.saveApplication( formData ).then(
            res => res.json()
        ).then(data => {
            console.log('api status', data);
        }).catch(err => {
            console.log('ERROR: ', err);
        })

    }

    render() {
        return (
            <div className="ui loading" >
                { this.state.formValid ? '' : (
                    <div className="panel panel-default">
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                ) }
                <form id="application_form" className="ui form">
                    <h4 className="ui dividing header">Applicant Information</h4>
                    <div className="field">
                        <div className="two fields">
                            <div className={`field `}>
                                <label>First Name</label>
                                <input type="text" name="firstname" placeholder="First Name" onChange={(event) => this.handleUserInput(event)} />
                            </div>
                            <div className="field">
                                <label>Last Name</label>
                                <input type="text" name="lastname" placeholder="Last Name" onChange={(event) => this.handleUserInput(event)} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="two fields">
                        <div className={`field `}>
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="demo@example.com" onChange={(event) => this.handleUserInput(event)} />
                        </div>
                        <div className={`field `}>
                            <label>Phone</label>
                            <input type="text" name="phone" placeholder="Phone" onChange={(event) => this.handleUserInput(event)} />
                        </div>
                    </div>
                    
                    <div className="field">
                        <label>Message/Comment</label>
                        <textarea name="message" rows="3" onChange={(event) => this.handleUserInput(event)}></textarea>
                    </div>
                    <button className="ui positive right labeled icon button" type="submit" onClick={(event) => this.handleSubmit(event)} disabled={!this.state.formValid}>
                        Save Application
                        <i className="checkmark icon"></i>
                    </button>
                </form>
            </div>
        );
    }
}