import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <button type="submit" onClick={(e) => e.preventDefault()}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;