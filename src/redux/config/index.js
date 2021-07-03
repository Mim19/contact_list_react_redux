import { compose, createStore } from "redux";
import { rootReducer } from "../rootReducer";

let store = createStore(rootReducer, compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));  

export default store