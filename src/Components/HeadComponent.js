import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import placeholderImg from '../Public/images/placeholder-space.jpg';

export default class HeadComponent extends Component {
    static defaultProps = {
        title: 'Broker Portal',
        url: document.documentURI,
        description: "Use for the sale/purchase the spaces",
        image: placeholderImg
    };
    render() {
        const { title, url, description, image } = this.props;
        return (
            <Helmet>
                <title>{title}</title>
                <meta property="og:url" content={url} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
            </Helmet>
        );
    }
}