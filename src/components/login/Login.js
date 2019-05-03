import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <label>
                        Email
                        <input placeholder="Email"/>
                    </label>
                    <br/>

                    <label>
                        Password
                        <input placeholder="Password"/>
                    </label>
                    <br/>
                    <button type="submit" onClick={(e) => e.preventDefault()}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;