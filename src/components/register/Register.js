import React from 'react';

class Register extends React.Component {
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form>
                    <input placeholder="First Name"/>
                    <input placeholder="Last Name"/>
                    <input placeholder="Email"/>
                    <input placeholder="Password"/>
                    <input placeholder="Confirm Password"/>
                    <button type="submit" onClick={(e) => e.preventDefault()}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;