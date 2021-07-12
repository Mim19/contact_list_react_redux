import {
    CREATE_CONTACT,
    DELETE_CONTACT,
    EDIT_CONTACT,
    FAVORITE,
    MESSAGE,
    POPUP,
    // SET_Contact,
} from './types';

// export const setContact = (id) => {
//     return {
//         type: SET_Contact,
//         payload: id,
//     }
// }

export const createContact = (user) => {
    return {
        type: CREATE_CONTACT,
        payload: user,
    };
};

export const deleteContact = (id) => {
    return {
        type: DELETE_CONTACT,
        payload: id,
    };
};

export const editContact = (data) => {
    return {
        type: EDIT_CONTACT,
        payload: data,
    };
};

export const messageAction = (text) => {
    return {
        type: MESSAGE,
        payload: text,
    };
};

export const popupAction = () => {
    return {
        type: POPUP,
    };
};

export const favoriteAction = (id) => {
    console.log(id)
    return {
        type: FAVORITE,
        payload: id,
    };
};
