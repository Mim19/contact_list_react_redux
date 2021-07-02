import { div } from 'prelude-ls';
import React, { useState } from 'react';
import ContactForm from './compnents/form/ContactForm';
import List from './compnents/list/List';
import Alert from './compnents/alert/Alert';
import EditPopup from './compnents/popup/EditPopup';
import { validate } from './util/emailValidation';
import { urlValidate } from './util/is-image-url';
import errorMessages from './constants/errorMessages';

const App = () => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [action, setAction] = useState('Add');
    const [isValideUrl, setIsValideUrl] = useState('error');
    const [users, setUsers] = useState([]);
    const [index, setIndex] = useState('');
    const [message, setMessage] = useState('');

    const showHandler = () => setOpen((prev) => !prev);

    const clickHandler = async (e, data) => {
        const { name, surname, email, photo, phone } = data || {} ;
        e.preventDefault();
        if (!phone || !name || !surname || !email || !photo) {
            setMessage(errorMessages.fill);
            return;
        }
        if (!(name.length || surname.length)) {
            setMessage(errorMessages.name);
            return;
        }

        if (!validate(email)) {
            setMessage(errorMessages.email);
            return;
        }

        if (phone.includes(' ')) {
            setMessage(errorMessages.phone);
            return;
        }

        const res = await urlValidate(photo);
        setIsValideUrl(res);
        if (isValideUrl !== 'success') {
            console.log(isValideUrl);
            setMessage(errorMessages.photo);
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
        setEdit((prev) => !prev);
        setIndex(index);
    };

    const deleteHandler = (index) => {
        let del = window.confirm('Are you sure you want to delete?');
        if (!del) {
            return;
        } else {
            setUsers((prev) => {
                prev.splice(index, 1);
                return prev;
            });
        }
    };

    const alertHandler = () => {
        setMessage('');
    };

    const closeHandler = (e) => {
        e.preventDefault()
        setAction('Add');
        setEdit((prev) => !prev);
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
                            users={users}
                            popupHandler={popupHandler}
                            deleteHandler={deleteHandler}
                        />
                    </div>
                    {edit && (
                        <EditPopup
                            closeHandler={closeHandler}
                            editHandler={editHandler}
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

export default App;
