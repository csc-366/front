import {SET_OBSERVATION_DATE, SET_FORM_DATA} from "./types";

export const setFormData = (data) => {
    return {
        type: SET_FORM_DATA,
        payload: {data}
    }
};

export const setObservationDate = (date) => {
    console.log(date);
    return {
        type: SET_OBSERVATION_DATE,
        payload: {date}
    }
};
