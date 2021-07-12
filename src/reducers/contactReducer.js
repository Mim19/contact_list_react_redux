import {
    CREATE_CONTACT,
    DELETE_CONTACT,
    EDIT_CONTACT,
    FAVORITE,
    MESSAGE,
    POPUP,
} from '../actions/types';

let initialState = {
    users: [],
    index: '',
    popup: false,
    message: '',
};  

export const contactReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_CONTACT:
            // return {
            //     ...state,
            //     users: [
            //         ...state.users,
            //         payload
            //     ],
            // };
            return {
                ...state,
                users: state.users.concat(payload),
            };

        case DELETE_CONTACT:
            state.users.splice(payload, 1);
            return {
                ...state,
                users: [...state.users],
            };

        case EDIT_CONTACT:
            const { id, userData } = payload;
            state.users[id] = userData;
            return {
                ...state,
                users: [...state.users],
                index: id,
            };

        case POPUP:
            return {
                ...state,
                popup: !state.popup,
            };

        case MESSAGE:
            return {
                ...state,
                message: payload,
            };

        case FAVORITE:
            const i = payload;

            state.users[i].isFavorite = !state.users[i].isFavorite;
            return {
                ...state,
                users: [...state.users],
            };
        default:
            return state;
    }
};
