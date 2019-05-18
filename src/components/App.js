import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Cover from './cover/Cover';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Register from "./register/Register";

import "./App.css";

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Cover}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/dashboard" component={Dashboard}/>
        </Router>
    )
};

export default App;