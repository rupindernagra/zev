import React, { Component } from 'react';

export default class SpaceListing extends Component {
    render() {
        console.log('props..', this.props);
        const { space } = this.props;
        return (
            <div className="ui fluid card related-listing">
                <div className="image">
                    <img src="https://opendoor.imgix.net/https%3A%2F%2Flisting-photos-production.s3.amazonaws.com%2Fuploads%2Fphotography_request-33471%2F15874232-_FS3Ld7ustY.jpg?ixlib=rb-1.1.0&w=760&h=480&auto=compress&fit=crop&s=df31dffd6c60c69695764840697b26a1" alt="similar space" />
                    <div className="listing-overlay">
                        <div className="listing-price">${`${space.price}`}</div>
                        <span className="small">&nbsp; $161/ft²</span>
                    </div>
                </div>
                <div className="content">
                    <a href="/" className="header listing-card-address">{jsUcfirst(space.space_name)}</a>
                    <div className="meta">
                        <span className="date">{`${space.no_of_bedrooms} bed ${space.no_of_bathrooms} bath`}
                        {space.floor_space ? ` · ${space.floor_space}  ft²` : null}</span>
                    </div>
                </div>
            </div>
        );
    }
}

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}