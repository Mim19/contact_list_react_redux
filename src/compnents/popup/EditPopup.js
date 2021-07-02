import React from 'react';

import ContactForm from '../form/ContactForm';

import './editPopup.css';

const EditPopup = ({ closeHandler, editHandler, action, user }) => {
    console.log(user)
    return (
        <div className="popup">
            <div className="popup_open">
                <div className="box">
                    <ContactForm
                        cancelHandler={closeHandler}
                        clickHandler={editHandler}
                        action={action}
                        user={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
