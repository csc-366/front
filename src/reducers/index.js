import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {adminReducer} from "./admin";
import {userReducer} from "./user";
import {errorReducer} from "./error";
import {formOptionsReducer} from "./formOptions";

export default combineReducers({
    form: formReducer,
    admin: adminReducer,
    user: userReducer,
    error: errorReducer,
    formOptions: formOptionsReducer
})