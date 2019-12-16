import React, { Component } from 'react';
import API from '../Common/API';
import PublicMenu from './PublicMenu';

export default class PublicSpacesListing extends Component {
    constructor(props) {
        super(props);
        this.api = new API();
    }
    componentDidMount() {
        this.api.getSpaces()
            .then(res => res.json())
            .then(response => {
                console.log('spaces', response);
                // let spaces = [];
                // spaces = response.result.filter(space => space.space_type === data.result.space_type && space.id !== data.result.id);
                // Set similar spaces
                // this.setState({
                //     similarSpaces: spaces.slice(0, 3)
                // });
            })
            .catch(err => {
                console.log('ERR: ', err);
            });
    }

    render() {
        return (
            <>
                <PublicMenu />
                <div>Hhu ther..</div>
            </>
        );
    }
}