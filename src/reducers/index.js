import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {createObservationReducer} from "../reducers/createObservation";

export default combineReducers({
    form: formReducer,
    observationData: createObservationReducer
})