import React, { Component } from 'react';
import API from '../Common/API';
import placeholderImg from './images/placeholder-space.jpg';

export default class SpaceListing extends Component {
    api = new API();

    render() {
        const { space } = this.props;
        let image = '';
        if (space.gallery !== '') {
            image = JSON.parse(space.gallery);
            image = this.api.spaceImageUrl + image[0];
        }
        return (
            <div className="ui fluid card related-listing">
                <div className="image">
                    {(image !== '' && image !== null) ? (
                        <img style={{ width: '100%', height: '240px', objectFit: 'cover' }} alt="similar space" src={image} />
                    ) : (
                        <img style={{ width: '100%', height: '240px', objectFit: 'cover' }} alt="similar placeholder" src={placeholderImg} />
                    )}
                    <div className="listing-overlay">
                        <div className="listing-price">${`${space.price}`}</div>
                        <span className="small">&nbsp; $161/ft²</span>
                    </div>
                </div>
                <div className="content">
                    <a href={`/public/space/${space.id}`} className="header listing-card-address">{jsUcfirst(space.space_name)}</a>
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