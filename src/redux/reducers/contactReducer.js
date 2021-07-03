import {CREATE_CONTACT, DELETE_CONTACT, EDIT_CONTACT, MESSAGE, POPUP} from '../types'

let initialState = {
    users:[{
        name:'',
        surname:'',
        email:'',
        phone:'',
        photo:'',
        isOnline:false
    }],
    index:'',
    popup: false,
    message:''
}

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONTACT:
            return {
                ...state,
                users: state.users.concat(action.payload)
            }
        
        case DELETE_CONTACT:
            state.users.splice(action.payload, 1)
            return {
                ...state,
                users: [...state.users]
            }
        
        case EDIT_CONTACT:
            const {id, userData} = action.payload
            state.users[id] = userData
            return {
                ...state,
                users:[...state.users],
                index: id,
            }

        case POPUP:
             return {
                 ...state,
                 popup: !state.popup
             }
        case MESSAGE:
             return {
                 ...state,
                 message: action.payload
             }
        default:
            return state
    }
    
}