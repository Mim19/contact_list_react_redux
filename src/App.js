import React, { useState } from 'react';
import ContactForm from './compnents/form/ContactForm';
import List from './compnents/list/List';
import Alert from './compnents/alert/Alert';
import EditPopup from './compnents/popup/EditPopup';
import { validate } from './util/emailValidation';
import { urlValidate } from './util/is-image-url';
import errorMessages from './constants/errorMessages';
import { connect } from 'react-redux';
import {
    messageAction,
    popupAction,
    createContact,
    editContact,
} from './actions/contacts';

const App = ({
    users,
    message,
    popup,
    popupAction,
    messageAction,
    createContact,
    editContact,
}) => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('Add');
    const [index, setIndex] = useState('');
    const [isValideUrl, setIsValideUrl] = useState('error');
    const [isFav, setIsFav] = useState(false);

    const rangeHandler = (e) => {
        setIsFav((prev) => !prev);
    };

    const showHandler = () => setOpen((prev) => !prev);
    const clickHandler = async (e, data) => {
        const { name, surname, email, photo, phone } = data || {};
        e.preventDefault();
        if (!phone || !name || !surname || !email || !photo) {
            messageAction(errorMessages.fill);
            return;
        }
        if (!(name.length || surname.length)) {
            messageAction(errorMessages.name);
            return;
        }

        if (!validate(email)) {
            messageAction(errorMessages.email);
            return;
        }

        if (phone.includes(' ')) {
            messageAction(errorMessages.phone);
            return;
        }

        const res = await urlValidate(photo);
        setIsValideUrl(res);
        if (isValideUrl !== 'success') {
            messageAction(errorMessages.photo);
            return;
        }
        createContact(data);
    };
    const editHandler = async (e, data) => {
        const { name, surname, email, photo, phone } = data || {};
        e.preventDefault();
        if (!phone || !name || !surname || !email || !photo) {
            messageAction(errorMessages.fill);
            return;
        }
        if (!(name.length || surname.length)) {
            messageAction(errorMessages.name);
            return;
        }

        if (!validate(email)) {
            messageAction(errorMessages.email);
            return;
        }

        if (phone.includes(' ')) {
            messageAction(errorMessages.phone);
            return;
        }

        const res = await urlValidate(photo);
        setIsValideUrl(res);
        if (isValideUrl !== 'success') {
            messageAction(errorMessages.photo);
            return;
        }
        editContact({
            id: index,
            userData: data,
        });

        closeHandler(e);
    };

    const popupHandler = (e, index) => {
        setAction((prev) => {
            if (prev === 'Save') {
                return 'Add';
            } else {
                return 'Save';
            }
        });
        popupAction();
        setIndex(index);
    };

    const alertHandler = () => {
        messageAction('');
    };

    const closeHandler = (e) => {
        e.preventDefault();
        setAction(() => 'Add');
        popupAction();
    };

    return (
        <div className="container">
            <h1>Contact List</h1>
            <i
                className={`fas fa-lg fa-chevron-${open ? 'down' : 'up'}`}
                onClick={showHandler}
            />
            {open ? (
                <div>
                    {message && action === 'Add' && (
                        <Alert message={message} alertHandler={alertHandler} />
                    )}
                    <div className="box">
                        <ContactForm
                            clickHandler={clickHandler}
                            cancelHandler={() => {}}
                            action={action}
                        />
                    </div>
                    <div>
                        <div className="d-flex">
                            <label className="mr-2">Favorite</label>
                            <input
                                type="range"
                                defaultValue={0}
                                min={0}
                                max={1}
                                onChange={rangeHandler}
                                className="range-input"
                            />
                        </div>
                        <List closeHandler={popupHandler} isFav={isFav} />
                    </div>
                    {popup && (
                        <EditPopup
                            message={message}
                            popupHandler={popupHandler}
                            editHandler={editHandler}
                            action={action}
                            user={users[index]}
                            alertHandler={alertHandler}
                        />
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.contact.users,
        message: state.contact.message,
        popup: state.contact.popup,
    };
};

export default connect(mapStateToProps, {
    messageAction,
    popupAction,
    createContact,
    editContact,
})(App);
