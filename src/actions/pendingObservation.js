import {ERROR, GET_PENDING_OBSERVATION, GET_PENDING_OBSERVATION_COUNT, GET_PENDING_OBSERVATIONS} from "./types";
import {backend} from "../apis/backend";
import {camelCaseObject} from "../util/db";

export const getPendingObservations = () => async (dispatch) => {
    const observations = (await backend.get("/observations/all")).data.data;

    dispatch({
        type: GET_PENDING_OBSERVATIONS,
        payload: {observations}
    })
};

export const getPendingObservation = (id) => async (dispatch) => {
    try {
        const observation = (await backend.get(`/observations/pending/${id}`));
        dispatch({
            type: GET_PENDING_OBSERVATION,
            payload: {
                observation: camelCaseObject(observation.data.data)
            }
        })
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.message}
        })
    }
};

export const getPendingObservationCount = () => async (dispatch) => {
    const count = (await backend.get('/observations/count')).data.data.count;

    dispatch({
        type: GET_PENDING_OBSERVATION_COUNT,
        payload: {count}
    })
};
