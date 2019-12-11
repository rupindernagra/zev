import React, {Component} from 'react';

export default class Placeholder extends Component {

    render() {
        let showPlaceholder;
        if( this.props.type === 'line') {
            showPlaceholder = 
                <div className="ui placeholder">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
        }
        return (
            <div>
                {showPlaceholder}
            </div>
        );
    }
}