import React, { useState } from 'react';

import inputs from '../../constants/inputs';

import './contactForm.css';

const ContactForm = ({ clickHandler, cancelHandler, action, user }) => {
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
    return (
        <form className="userform" onSubmit={(e) => clickHandler(e, us)}>
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

export default ContactForm;
