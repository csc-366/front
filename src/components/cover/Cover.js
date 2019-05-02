import React from 'react';
import {Link} from 'react-router-dom';

class Cover extends React.Component {
    render () {
        return (
            <div>
                <h1>Cover</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        )
    }
}

export default Cover;