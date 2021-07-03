import React from 'react';
import { connect } from 'react-redux';
import { deleteContact } from '../../redux/actions/deleteContact';

import './listItem.css';

const ListItem = ({ index, user, popupHandler,  deleteContact }) => {
const deleteHandler = () => {
    let del = window.confirm('Are you sure you want to delete?');
    if (!del) {
        return;
    } else {   
        deleteContact(index)
    }
}

    return (
        <li className="list scale-in-center" key={index}>
            <div>
                <i
                    className={`fas fa-circle ${
                        user.isOnline ? 'green' : 'gray'
                    }`}
                />
            </div>
            <div>
                <img src={user.photo} alt="image" />
            </div>
            <div>
                <span className="name">{user.name}</span>
                <span className="surname">{user.surname}</span>
                <span>{user.phone}</span>
                <span>{user.email}</span>
            </div>
            <div>
                <i
                    onClick={popupHandler}
                    className="fas fa-user-edit fa-lg icon"
                />
                <i
                    onClick={deleteHandler}
                    className="fas fa-user-times fa-lg icon"
                />
            </div>
        </li>
    );
};


export default connect(null, {deleteContact})(ListItem);
