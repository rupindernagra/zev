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
        const plaidPayload = {
            public_token: token,
        };
        this.api.getPlaidAccessToken(plaidPayload)
            .then(res => res.json())
            .then(data => {
                console.log('data..', data);
                // Stripe payment here.
                if (!data.error) {
                    const stripePayload = {
                        access_token: data.tokenResponse.access_token,
                        item_id: data.tokenResponse.item_id,
                        account_id: metadata.account_id,
                        institution_id: metadata.institution.institution_id,
                        initial_products: ["auth", "transactions"]
                    };
                    this.api.stripePayment(stripePayload)
                        .then(res => res.json())
                        .then(payment => {
                            console.log('payment', payment);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            });
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
                userLegalName="Squareloops"
                userEmailAddress="sameer.squareloops@gmail.com"
                onClick={this.save}
                onLoad={this.handleOnLoad}
                onExit={this.handleOnExit}
                onSuccess={this.handleOnSuccess}>
                Open Link and connect your bank!
            </PlaidLink>
        );
    }
}