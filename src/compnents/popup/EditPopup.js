import React from 'react';
import { connect } from 'react-redux';

import { editContact } from '../../actions/contacts';
import Alert from '../alert/Alert';

import ContactForm from '../form/ContactForm';

import './editPopup.css';

const EditPopup = ({
    popupHandler,
    action,
    user,
    message,
    editHandler,
    alertHandler,
}) => {
    return (
        <div className="popup">
            <div className="popup_open">
                {message && (
                    <Alert message={message} alertHandler={alertHandler} />
                )}
                <div className="box">
                    <ContactForm
                        clickHandler={editHandler}
                        cancelHandler={popupHandler}
                        action={action}
                        user={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default connect(null, { editContact })(EditPopup);
