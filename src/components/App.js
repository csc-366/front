import React from 'react';
import {Router, Route} from 'react-router-dom';
import Cover from './cover/Cover';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import View from './view/view';
import Register from './register/Register';
import Account from './account/Account';
import history from '../history';
import {connect} from 'react-redux';

import "./App.css";
import ManageUsers from "./admin/ManageUsers";
import ErrorSnackbar from "./common/ErrorSnackbar";
import Admin from './admin/Admin';

class App extends React.Component {
    mapPrivilegedRoutes = () => {
        if (this.props.isLoggedIn) {
            return (
                <>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/view" component={View}/>
                    <Route path="/account" component={Account}/>
                </>
            )
        }
        return null
    };

    mapAdminRoutes = () => {
        if (this.props.isLoggedIn && this.props.role === 'Admin') {
            return (
                <>
                    <Route path="/manage_users" component={ManageUsers}/>
                    <Route path="/admin" component={Admin}/>
                </>
            )
        }
        return null
    };

    render() {
        return (
            <React.Fragment>
                <ErrorSnackbar/>
                <Router history={history}>
                    <Route path="/" exact component={Cover}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    {this.mapPrivilegedRoutes()}
                    {this.mapAdminRoutes()}
                </Router>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.user.username,
        role: state.user.role
    }
};

export default connect(mapStateToProps)(App);