import {SET_FORM_DATA, SET_OBSERVATION_DATE} from "../actions/types";

const initialState = {
};

export function createObservationReducer(state=initialState, action) {
    switch(action.type) {
        case SET_FORM_DATA:
            return {...state, ...action.payload.data};
        case SET_OBSERVATION_DATE:
            return {...state, date: action.payload.date};
        default:
            return state;
    }
}