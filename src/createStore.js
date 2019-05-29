import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(reduxThunk)));

    let persistor = persistStore(store);
    return {store, persistor}
}
