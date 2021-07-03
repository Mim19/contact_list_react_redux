import { CREATE_CONTACT } from "../types"

export const createContact = (user) => {
    return{
        type: CREATE_CONTACT,
        payload: user
    }
}