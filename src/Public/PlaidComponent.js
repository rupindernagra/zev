import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link'
import API from '../Common/API';

const PLAID_PUBLIC_KEY = 'aec5a1cc5ee105b4d82ec8ec416946';

export default class PlaidComponent extends Component {
    api = new API();

    handleOnLoad = () => {
        // Optional, called when Link loads
    }
    handleOnSuccess = (token, metadata) => {
        // send token to client server
        console.log('token', token);
        console.log('metadata', metadata);
        const plaidPayload = {
            public_token: token,
            account_id: metadata.account_id
        };
        this.api.getPlaidAccessToken( plaidPayload )
            .then(res => res.json())
            .then(data => {
                console.log('data..', data);
            })
            .catch(err => {
                console.log(err);
            });

        // access_token: "access-sandbox-0c3980b4-9480-4dde-83c0-806b1e6908b9"
        // item_id: "vyQKpMl965TlBd6KLrKQHxlzxRooWxiWjnqao"
    }
    handleOnExit = (err, metadata) => {
        // handle the case when your user exits Link
        console.log('in exit');
        // The user exited the Link flow.
        if (err != null) {
            // The user encountered a Plaid API error prior to exiting.
        }
        // metadata contains information about the institution
        // that the user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
    }
    save = (el) => {
        console.log('here in save', el);
    }
    render() {
        return (
            <PlaidLink
                clientName="Plaid Quickstart"
                env="sandbox"
                product={["auth", "transactions"]}
                publicKey={PLAID_PUBLIC_KEY}
                userLegalName="Sameer"
                userEmailAddress="sameer@squareloops.com"
                onClick={this.save}
                onLoad={this.handleOnLoad}
                onExit={this.handleOnExit}
                onSuccess={this.handleOnSuccess}>
                Open Link and connect your bank!
            </PlaidLink>
        );
    }
}