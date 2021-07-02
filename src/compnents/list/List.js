import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import ListItem from '../list-item/ListItem';

import './list.css';

const List = ({ users, deleteHandler, popupHandler }) => {
    return (
        <ul>
            {users.map((item, index) => (
                <ListItem
                    key={uuidv4()}
                    user={item}
                    index={index}
                    deleteHandler={() => deleteHandler(index)}
                    popupHandler={() => popupHandler(index)}
                />
            ))}
        </ul>
    );
};

export default List;
