import React from 'react';
import { connect } from 'react-redux';
import { editContact } from '../../redux/actions/editContact';

import ContactForm from '../form/ContactForm';

import './editPopup.css';

const EditPopup = ({ closeHandler,  action, user }) => {
    
    return (
        <div className="popup">
            <div className="popup_open">
                <div className="box">
                    <ContactForm
                        cancelHandler={closeHandler}

                        action={action}
                        user={user}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditPopup;
