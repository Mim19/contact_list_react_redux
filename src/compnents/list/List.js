import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { editContact } from '../../redux/actions/editContact';

import ListItem from '../list-item/ListItem';

import './list.css';

const List = ({ users, deleteHandler, popupHandler }) => {
    console.log("ul:",users)
    return (
        <ul>
            {users.map((item, index) => (
                <ListItem
                    key={uuidv4()}
                    user={item}
                    index={index}
                    popupHandler={() => popupHandler(index)}
                />
            ))}
        </ul>
    );
};


const mapStateToProps = (state) => {
    return {

        users: state.contact.users
    }
}
export default connect(mapStateToProps, {editContact})(List);
