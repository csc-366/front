import {SET_FORM_DATA} from "./types";

export const setFormData = (data) => {
    return {
        type: SET_FORM_DATA,
        payload: {data}
    }
};
