import { combineReducers } from "redux";
import { contactReducer } from "./reducers/contactReducer";


export const rootReducer = combineReducers({
   contact: contactReducer
})