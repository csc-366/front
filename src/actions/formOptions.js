import {DELETE_VALUE, ERROR, GET_PRESET_DATA, UPDATE_PRESET_DATA} from "./types";
import {backend} from "../apis/backend";

export const getPresetData = () => async (dispatch) => {
    try {
        const data = (await backend.get('/formOptions')).data.data;
        dispatch({
            type: GET_PRESET_DATA,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.response.data.message}
        })
    }
};

export const deleteValue = (valueType, valueKey, value) => async (dispatch) => {
    console.log(valueType, valueKey.toLowerCase(), value);
    try {
        await backend.delete(`/formOptions/${valueType}`, {
            data: {
                [valueKey.toLowerCase()]: value
            }
        });
        dispatch({
            type: DELETE_VALUE,
            payload: {
                value: [valueType, valueKey, value]
            }
        })
    } catch (e) {
        const {response} = e;
        console.log(response);
        let message = response.data.message;
        if (typeof message === 'object') {
            message = message.map(error => `${error.param} ${error.msg}`).join(', ')
        }
        dispatch({
            type: ERROR,
            payload: {message}
        })
    }
};

export const updateFormOption = (option) => (value) => async (dispatch) => {
    let url = null;
    switch(option) {
        case 'locations':
            url = '/formOptions/locations';
            break;
        case 'positions':
            url = '/formOptions/tagPositions';
            break;
        case 'colors':
            url = '/formOptions/colors';
            break;
        case 'rookeries':
            url = '/formOptions/rookeries';
            break;
        case 'ageClasses':
            url = '/formOptions/ageClasses';
            break;
        case 'affiliations':
            url = '/formOptions/affiliations';
            break;
        default:
            return;
    }

    try {
        const result = (await backend.post(url, value)).data.data;
        await getPresetData();
        dispatch({
            type: UPDATE_PRESET_DATA,
            payload: {[option]: result}
        })
    } catch (e) {
        console.log(e);
        dispatch({
            type: ERROR,
            payload: {message: e.message}
        })
    }
};
