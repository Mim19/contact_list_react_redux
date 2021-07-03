import { DELETE_CONTACT } from "../types"

export const deleteContact = (id) => {
    return{
        type: DELETE_CONTACT,
        payload: id
    }
}