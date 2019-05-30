import {PURGE} from './types';
import history from '../history';

export const purgeStore = (persistor) => async dispatch => {
    const success = await persistor.purge();
    history.push('/');
    dispatch({
        type: PURGE,
    })
};