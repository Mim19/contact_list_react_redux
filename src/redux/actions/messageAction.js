
import { MESSAGE } from "../types"

export const messageAction = (text) => {
    return{
        type: MESSAGE,
        payload: text
    }
}