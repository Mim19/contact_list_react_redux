import { EDIT_CONTACT } from "../types"

export const editContact = (data) => {
    return{
        type: EDIT_CONTACT,
        payload: data
    }
}