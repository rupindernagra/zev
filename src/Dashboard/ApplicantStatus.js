import React from 'react';

const ApplicantStatus = props => {
    return (
        <span className={ApplStatus[props.title].spanClass}>
            <i className={`mr-2 fa ${ApplStatus[props.title].iconName}`}></i>
            {props.title}
        </span>
    )
};

ApplicantStatus.defaultProps = {
    title: 'Sent'
};

const ApplStatus = {
    Sent: {
        spanClass: 'asent',
        iconName: 'fa-paper-plane-o'
    },
    Opened: {
        spanClass: 'aopen',
        iconName: 'fa-envelope-open-o'
    },
    Completed: {
        spanClass: 'acomp',
        iconName: 'fa-thumbs-o-up'
    }
};

export default ApplicantStatus;