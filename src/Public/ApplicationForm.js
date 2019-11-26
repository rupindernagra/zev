import React, { Component } from 'react';

export default class ApplicationForm extends Component {
    render() {
        return (
            <form className="ui form applicant-form">
                <h4 className="ui dividing header">Applicant Information</h4>
                <div className="field">
                    <label>Name</label>
                    <div className="two fields">
                        <div className="field">
                            <input type="text" name="firstname" placeholder="First Name" onChange={this.handleChange} />
                        {/* {errors.first_name.length > 0 &&
                            <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>} */}
                        </div>
                        <div className="field">
                            <input type="text" name="lastname" placeholder="Last Name" />
                        </div>
                    </div>
                </div>
                
                <div className="two fields">
                    <div className="field">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="demo@example.com" />
                        {/* {errors.email.length > 0 &&
                        <span className='error pr-15 text-right text-danger d-block'>{errors.email}</span>} */}
                    </div>
                    <div className="field">
                        <label>Phone</label>
                        <input type="text" name="phone" maxlength="3" placeholder="Phone" />
                    </div>
                </div>
                
                <div class="field">
                    <label>Message/Comment</label>
                    <textarea name="message" rows="3"></textarea>
                </div>
            </form>
        );
    }
}