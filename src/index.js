import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import {PersistGate} from 'redux-persist/integration/react';
import createStore from './createStore';

const {store, persistor} = createStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App persistor={persistor}/>
        </PersistGate>
    </Provider>,
    document.querySelector('#root')
);
