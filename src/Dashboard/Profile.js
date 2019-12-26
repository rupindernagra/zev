import React, { Component } from 'react';
import API from '../Common/API';
import './dashboard.css';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import AdminMobileFooter from './AdminMobileFooter';
const JSAlert = require('js-alert');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            file: null,
            saveButtonVisible: false,
            firstname: '',
            lastname: '',
            phone: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            formErrors: { firstname: '', email: '', phone: '', currentPassword: '', newPassword: '', confirmPassword: '' },
            firstnameValid: false,
            emailValid: false,
            phoneValid: false,
            currentPasswordValid: false,
            newPasswordValid: false,
            confirmPasswordValid: false,
            infoFormValid: false,
            passwordFormValid: false
        }
        this.api = new API();
    }

    componentDidMount() {
        this.api.myProfile().then(
            res => res.json()
        ).then(userData => {
            console.log('profile', userData);
            this.setState({
                user: userData.result,
                firstname: userData.result.firstname,
                lastname: userData.result.lastname,
                phone: userData.result.phone
            });
        }).catch(err => {
            console.log('ERR: ', err);
        })
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            avatarUpdated: false,
            file: URL.createObjectURL(event.target.files[0]),
            saveButtonVisible: true
        });
    }

    fileSubmitHandler = () => {
        const avatarData = new FormData();
        avatarData.append('avatar', this.state.selectedFile, this.state.selectedFile.name, {
            onUploadProgress: ProgressEvent => {
                console.log(`Upload Progress: ${Math.round(ProgressEvent.loaded / ProgressEvent.total * 100)}`);
            }
        });

        this.api.uploadAvatar(avatarData).then(res => {
            return res.json()
        }).then(data => {
            console.log('up', data);
            this.setState({
                saveButtonVisible: false
            });
            JSAlert.alert("Avatar uploaded!", "", JSAlert.Icons.Success).dismissIn(2000);
        }).catch(err => {
            console.log('Upload ERR: ', err);
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value) }
        );
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let { firstnameValid, phoneValid, currentPasswordValid, newPasswordValid, confirmPasswordValid } = this.state;

        switch (fieldName) {
            case 'firstname':
                firstnameValid = value.length >= 3;
                fieldValidationErrors.firstname = firstnameValid ? '' : 'First name is too short';
                break;
            case 'phone':
                phoneValid = value.length >= 10;
                fieldValidationErrors.phone = phoneValid ? '' : 'Phone number is invalid';
                break;
            case 'currentPassword':
                currentPasswordValid = value.length > 0;
                fieldValidationErrors.currentPassword = currentPasswordValid ? '' : 'Current Password should not be blank';
                break;
            case 'newPassword':
                newPasswordValid = value.length >= 8;
                fieldValidationErrors.newPassword = newPasswordValid ? '' : 'Password is too short';
                break;
            case 'confirmPassword':
                confirmPasswordValid = value === this.state.newPassword;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'New and confirm password should be same';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstnameValid, phoneValid, currentPasswordValid, newPasswordValid, confirmPasswordValid
        }, this.validateForm);
    }

    validateForm() {
        const { firstnameValid, phoneValid, currentPasswordValid, newPasswordValid, confirmPasswordValid } = this.state;
        this.setState({
            infoFormValid: firstnameValid && phoneValid,
            passwordFormValid: currentPasswordValid && newPasswordValid && confirmPasswordValid
        });
    }

    updateProfile = () => {
        const formData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
        };
        this.api.updateUserInfo(formData)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    JSAlert.alert("User Information updated!", "", JSAlert.Icons.Success).dismissIn(2000);
                }
            }).catch(err => {
                console.log('Update user ERR: ', err);
            });
    }

    changePassword = () => {
        const formData = {
            oldPassword: this.state.currentPassword,
            newPassword: this.state.newPassword
        };
        this.api.updatePassword(formData)
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    if (data.result.changedRows > 0) {
                        JSAlert.alert("Password successfully chanaged!", "", JSAlert.Icons.Success).dismissIn(2000);
                    } else {
                        JSAlert.alert("Sorry! Something went wrong. Please try again later", "", JSAlert.Icons.Warning).dismissIn(2000);
                    }
                } else {
                    JSAlert.alert("Sorry! Password is incorrect!", "", JSAlert.Icons.Failed).dismissIn(2000);
                }
            }).catch(err => {
                console.log('ERR in Password: ', err);
            });
    }

    render() {
        const { user, firstnameValid, phoneValid, currentPasswordValid, newPasswordValid, confirmPasswordValid } = this.state;
        const { formErrors } = this.state;

        return (<Content title="Profile" subTitle="Manager Profile" browserTitle="Zev Rector :: Manager Profile">
            <Row>
                <Col sm={4} xs={12}>
                    <Box title="Update Avatar" type="primary">
                        <Col xs={{ span: 8, offset: 2 }} className="text-center">
                            <div className="userDP" onClick={() => this.fileInput.click()}>
                                {this.state.file || user.image ? (
                                    <img className="avatar" alt="avatar" src={this.state.file || (this.api.avatarUrl + user.image)} />
                                ) : (
                                        <i className="fa fa-user user"></i>
                                    )}
                                <div class="update-avatar">Change Photo</div>
                            </div>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={this.fileSelectedHandler}
                                ref={fileInput => this.fileInput = fileInput} />

                            {this.state.saveButtonVisible ? (
                                // <button onClick={this.fileSubmitHandler}>Save Image</button>
                                <button onClick={this.fileSubmitHandler} className="ui labeled icon primary big button">
                                    <i className="icon save"></i>
                                    Save Avatar
                                </button>
                            ) : null}
                            <div className="userName mt-3">
                                <p>
                                    {user.firstname}
                                    {user.lastname ? ` ${user.lastname}` : ''}
                                </p>
                            </div>
                        </Col>
                    </Box>
                </Col>
                <Col sm={8} xs={12}>
                    <Box title="Update User Information" type="primary">
                        <form id="update-user-info" className="user-form update-info">
                            <div className="field">
                                <label className="control-label col-sm-2">Email</label>
                                <div className="col-sm-10">
                                    <p><strong><em>{user.email}</em></strong></p>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="firstname" className="control-label col-sm-2">First Name</label>
                                <div className="col-sm-10">
                                    <input required id="firstname" className="form-control" type="text" placeholder="Please input first name" name="firstname" defaultValue={this.state.firstname} onChange={this.handleChange} />
                                    {!firstnameValid && <span className='pl-3 text-left text-danger d-block'>{formErrors.firstname}</span>}
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="lastname" className="control-label col-sm-2">Last Name</label>
                                <div className="col-sm-10">
                                    <input required id="lastname" className="form-control" type="text" placeholder="Please input last name" name="lastname" defaultValue={this.state.lastname} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="phone" className="control-label col-sm-2">Phone Number</label>
                                <div className="col-sm-10">
                                    <input required id="phone" className="form-control" type="text" placeholder="Please input phone no." name="phone" defaultValue={this.state.phone} onChange={this.handleChange} />
                                    {!phoneValid && <span className='pl-3 text-left text-danger d-block'>{formErrors.phone}</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <Button id="btn-update-info" type="danger" text="Update" onClick={this.updateProfile} />
                                </div>
                            </div>
                        </form>
                    </Box>

                    <Box title="Update Password" type="primary">
                        <form id="update-user-password" className="user-form update-password">
                            <div className="field">
                                <label htmlFor="current-pass" className="control-label col-sm-2">Current Password</label>
                                <div className="col-sm-10">
                                    <input required id="current-pass" className="form-control" type="password" placeholder="Current Password" name="currentPassword" defaultValue={this.state.currentPassword} onChange={this.handleChange} autoComplete="cc-number" />
                                    {!currentPasswordValid && <span className='pl-3 text-left text-danger d-block'>{formErrors.currentPassword}</span>}
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="new-pass" className="control-label col-sm-2">New Password</label>
                                <div className="col-sm-10">
                                    <input required id="new-pass" className="form-control" type="password" placeholder="New Password" name="newPassword" defaultValue={this.state.newPassword} onChange={this.handleChange} autoComplete="cc-number" />
                                    {!newPasswordValid && <span className='pl-3 text-left text-danger d-block'>{formErrors.newPassword}</span>}
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="confirm-pass" className="control-label col-sm-2">Confirm Password</label>
                                <div className="col-sm-10">
                                    <input required id="confirm-pass" className="form-control" type="password" placeholder="Repeat Password" name="confirmPassword" defaultValue={this.state.confirmPassword} onChange={this.handleChange} autoComplete="cc-number" />
                                    {!confirmPasswordValid && <span className='pl-3 text-left text-danger d-block'>{formErrors.confirmPassword}</span>}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <Button id="btn-change-password" type="danger" text="Change Password" onClick={this.changePassword} disabled={!this.state.passwordFormValid} />
                                </div>
                            </div>
                        </form>
                    </Box>
                </Col>

                <AdminMobileFooter />

            </Row>
        </Content>);
    }
}