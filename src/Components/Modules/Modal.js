import React, { Component } from 'react';

export default class Modal extends Component {
    static defaultProps = {
        title: 'Modal',
        className: ''
    };
    render() {
        return (
            <div className={`ui modal ${this.props.className}`}>
                <i className="close icon"></i>
                <div className="header">
                    {this.props.title}
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