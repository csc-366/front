import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from "redux/es/redux";
import reducers from './reducers';
import {applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);
