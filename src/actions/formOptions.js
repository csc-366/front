import {ERROR, GET_LOCATIONS, GET_TAG_COLORS, GET_TAG_POSITIONS} from "./types";
import {backend} from "../apis/backend";

export const getLocations = () => async (dispatch) => {
    try {
        const locations = (await backend.get('/locations')).data.data;
        dispatch({
            type: GET_LOCATIONS,
            payload: {locations}
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.response.data.message}
        })
    }
};

export const getTagColors = () => async (dispatch) => {
    try {
        const colors = (await backend.get('/colors')).data.data;
        dispatch({
            type: GET_TAG_COLORS,
            payload: {colors}
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.response.data.message}
        })
    }
};

export const getTagPositions = () => async (dispatch) => {
    try {
        const positions = (await backend.get('/tagPositions')).data.data;
        dispatch({
            type: GET_TAG_POSITIONS,
            payload: positions
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.response.data.message}
        })
    }
}