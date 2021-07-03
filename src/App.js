import React, { useState } from 'react';
import ContactForm from './compnents/form/ContactForm';
import List from './compnents/list/List';
import Alert from './compnents/alert/Alert';
import EditPopup from './compnents/popup/EditPopup';
import { validate } from './util/emailValidation';
import { urlValidate } from './util/is-image-url';
import errorMessages from './constants/errorMessages';
import { connect } from 'react-redux';
import {messageAction} from '../src/redux/actions/messageAction'
import {popupAction} from '../src/redux/actions/popupAction'

const App = ({message,popup ,popupAction,messageAction}) => {
    const [open, setOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [action, setAction] = useState('Add');
    const [isValideUrl, setIsValideUrl] = useState('error');
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState('');
    const showHandler = () => setOpen((prev) => !prev);

    const clickHandler = async (e, data) => {
        const { name, surname, email, photo, phone } = data || {} ;
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
            console.log(isValideUrl);
            messageAction(errorMessages.photo);
            return;
        }
        setUsers((prev) => {
            return [
                ...prev,
                { name, surname, phone, email, isOnline, photo, index },
            ];
        });
    };
    const editHandler = (e, data) => {
        e.preventDefault();
        let newArr = [...users];
        newArr[index] = data;
        setUsers(newArr);
        setAction('Add');
        closeHandler(e);
    };

    const popupHandler = (index) => {
        setAction('Save');
        popupAction()
        setIndex(index);
    };

   

    const alertHandler = () => {
        messageAction('')
    };

    const closeHandler = (e) => {
        e.preventDefault()
        setAction('Add');
        popupAction()
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
                    {message && (
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
                        <List
                            popupHandler={popupHandler}
                        />
                    </div>
                    {popup && (
                        <EditPopup
                            closeHandler={closeHandler}
                            action={action}
                            user={users[index]}
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
        popup:state.contact.popup
    }
}

export default connect(mapStateToProps, {messageAction, popupAction})(App)

