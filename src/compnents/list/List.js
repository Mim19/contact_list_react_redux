import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { editContact } from '../../actions/contacts';

import ListItem from '../list-item/ListItem';

import './list.css';

const List = ({ users, closeHandler, isFav }) => {
    return (
        <ul>
            {users.map((item, index) => {
                if (isFav) {
                    return (
                        item.isFavorite && (
                            <ListItem
                                key={uuidv4()}
                                user={item}
                                index={index}
                                closeHandler={closeHandler}
                            />
                        )
                    );
                } else {
                    return (
                        <ListItem
                            key={uuidv4()}
                            user={item}
                            index={index}
                            closeHandler={closeHandler}
                        />
                    );
                }
            })}
        </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.contact.users,
    };
};

export default connect(mapStateToProps, { editContact })(List);
