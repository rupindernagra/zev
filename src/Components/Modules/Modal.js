import React, { Component } from 'react';

export default class Modal extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        console.log('props', this.props);
        return (
            <div className="ui modal">
                <i className="close icon"></i>
                <div className="header">
                    Submit Application
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="actions">
                    <div className="ui black deny button">
                    Nope
                    </div>
                    <div className="ui positive right labeled icon button">
                    Yep, that's me
                    <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        );
    }
}