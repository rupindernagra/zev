import React, { Component } from 'react';

export default class Modal extends Component {
    render() {
        return (
            <div className="ui modal">
                <i className="close icon"></i>
                <div className="header">
                    Submit Application
                </div>
                <div className="content">
                    { this.props.children }
                </div>
                <div className="actions">
                    <div className="ui black deny button">
                        Close
                    </div>
                </div>
            </div>
        );
    }
}