import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link'
import API from '../Common/API';

const PLAID_PUBLIC_KEY = 'aec5a1cc5ee105b4d82ec8ec416946';

export default class PlaidComponent extends Component {
    api = new API();

    handleOnSuccess = (token, metadata) => {
        // send token to client server
        console.log('token', token);
        console.log('metadata', metadata);
        this.api.getPlaidAccessToken({ public_token: token })
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
    handleOnExit() {
        // handle the case when your user exits Link
        console.log('in exit');
    }
    render() {
        return (
            <PlaidLink
                clientName="Plaid Quickstart"
                env="sandbox"
                product={["auth", "transactions"]}
                publicKey={PLAID_PUBLIC_KEY}
                onExit={this.handleOnExit}
                onSuccess={this.handleOnSuccess}>
                Open Link and connect your bank!
            </PlaidLink>
        );
    }
}