import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createContact, editContact } from '../../actions/contacts';

import inputs from '../../constants/inputs';

import './contactForm.css';

const mapStateToProps = (state) => {
    return {
        users: state.contact.users,
    };
};

const ContactForm = ({ cancelHandler, action, user, clickHandler, users }) => {
    const [us, setUs] = useState(user);
    const changeHandler = (e) => {
        setUs((prev) => {
            return {
                ...prev,
                isOnline: true,
                isFavorite:false,
                [e.target.name]: e.target.value,
                id: users[users.length-1] ?.id+1 || 0,
            };
        });
    };

    return (            
        <form className="userform" onSubmit={e => {clickHandler(e, us)}}> 
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

export default connect(mapStateToProps, {createContact, editContact})(ContactForm);
