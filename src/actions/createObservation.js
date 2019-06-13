import {LOAD_CREATE, SET_FORM_DATA} from "./types";

export const setFormData = (data) => {
    return {
        type: SET_FORM_DATA,
        payload: {data}
    }
};

export const loadMatch = (data) => {
    return {
        type: LOAD_CREATE,
        payload: {data}
    }
};
