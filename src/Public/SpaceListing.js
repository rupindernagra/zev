import React, { Component } from 'react';

export default class SpaceListing extends Component {
    render() {
        return (
            <div className="ui fluid card related-listing">
                <div className="image">
                    <img src="https://opendoor.imgix.net/https%3A%2F%2Flisting-photos-production.s3.amazonaws.com%2Fuploads%2Fphotography_request-33471%2F15874232-_FS3Ld7ustY.jpg?ixlib=rb-1.1.0&w=760&h=480&auto=compress&fit=crop&s=df31dffd6c60c69695764840697b26a1" alt="similar space" />
                    <div className="listing-overlay">
                        <div className="listing-price">$245,000</div>
                        <span className="small">&nbsp; $161/ft²</span>
                    </div>
                </div>
                <div className="content">
                    <a href="/" className="header listing-card-address">Team Fu</a>
                    <div className="meta">
                        <span className="date">4 bed 2.5 bath · 3,538 ft²</span>
                    </div>
                </div>
            </div>
        );
    }
}