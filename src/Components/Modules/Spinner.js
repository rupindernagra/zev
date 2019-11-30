import React from  'react';

const Spinner = props => {
    return (
        <div className="ui active dimmer">
            <div className={`ui text large ${props.type} loader`}>{props.message}</div>
        </div>
    );
}

Spinner.defaultProps = {
    message: 'Loading...',
    type: ''
}

export default Spinner;