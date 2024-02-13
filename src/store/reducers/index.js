import { combineReducers } from "redux";
import loginReducer from './loginReducer'
import postsReducer from './postsReducer'
import langReducer from "./langReducer";

const rootReducer = combineReducers ({
    session: loginReducer,
    posts: postsReducer,
    lang: langReducer
})

export default rootReducer