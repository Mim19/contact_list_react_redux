import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createContact } from '../../redux/actions/createContact';
import { editContact } from '../../redux/actions/editContact';

import inputs from '../../constants/inputs';

import './contactForm.css';

const ContactForm = ({  cancelHandler, action, user, createContact }) => {
    const [us, setUs] = useState(user);
    const changeHandler = (e) => {
        setUs((prev) => {
            return {
                ...prev,
                isOnline: true,
                [e.target.name]: e.target.value,
            };
        });
        
    };
    const createNewContact = (e) => {
        e.preventDefault()
        
        createContact(us)
    }
    return (
        <form className="userform" onSubmit={e => createNewContact(e)}>
            {inputs.map((input) => {
                let { name } = input;
                return (
                    <div key={input.placeholder}>
                        <label>{input.label}</label>
                        <input
                            defaultValue={action === 'Save' ? us[name] : ''}
                            name={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            onChange={changeHandler}
                        />
                    </div>
                );
            })}
            {action === 'Save' && (
                <div>
                    <button className="btn" onClick={(e) => cancelHandler(e)}>
                        Cancel
                    </button>
                </div>
            )}
            <div>
                <button className="btn">{action}</button>
            </div>
        </form>
    );
};

export default connect(null, {createContact, editContact})(ContactForm);
