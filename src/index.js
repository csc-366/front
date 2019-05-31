import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import createStore from "./createStore";
import {PersistGate} from 'redux-persist/lib/integration/react';

const {persistor, store} = createStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.querySelector('#root')
);
