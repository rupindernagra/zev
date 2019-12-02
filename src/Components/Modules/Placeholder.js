import React, {Component} from 'react';

export default class Placeholder extends Component {

    render() {
        let showPlaceholder;
        if( this.props.type === 'line') {
            showPlaceholder = 
                <div class="ui placeholder">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
        }
        return (
            <div>
                {showPlaceholder}
            </div>
        );
    }
}