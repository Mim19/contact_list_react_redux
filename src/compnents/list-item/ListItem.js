import React from 'react';

import { connect } from 'react-redux';
import { deleteContact, favoriteAction } from '../../actions/contacts';

import './listItem.css';

const ListItem = ({ index, user, closeHandler, deleteContact, favoriteAction }) => {
    const deleteHandler = () => {
        let del = window.confirm('Are you sure you want to delete?');
        if (!del) {
            return;
        } else {
            deleteContact(index);
        }
    };
    const favoriteHandler = () => {
        favoriteAction(index);
    };

    return (
        <li className="list scale-in-center" key={index}>
            <div>
                <i
                    className={`fas fa-circle ${
                        user?.isOnline ? 'green' : 'gray'
                    }`}
                />
            </div>
            <div>
                <img src={user?.photo} alt="image" />
            </div>
            <div>
                <span className="name">{user?.name}</span>
                <span className="surname">{user?.surname}</span>
                <span>{user?.phone}</span>
                <span>{user?.email}</span>
            </div>
            <div>
                <i
                    onClick={(e) => closeHandler(e, index)}
                    className="fas fa-user-edit fa-lg icon"
                />
                <i
                    onClick={deleteHandler}
                    className="fas fa-user-times fa-lg icon"
                />
                <i
                    onClick={favoriteHandler}
                    className={`fas fa-star icon ${
                        user?.isFavorite ? 'green' : 'gray'
                    }`}
                />
            </div>
        </li>
    );
};

export default connect(null, { deleteContact, favoriteAction })(ListItem);
