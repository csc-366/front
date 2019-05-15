import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Cover from './cover/Cover';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Header from './common/Header'
import Details from './details/Details';
import Register from './register/Register';
import Account from './account/Account';

import "./App.css";

const App = () => {
    return (
        <React.Fragment>
            <Router>
                <Header />
                <Route path="/" exact component={Cover}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/details" component={Details}/>
                <Route path="/account" component={Account}/>
            </Router>
        </React.Fragment>
    )
};

export default App;