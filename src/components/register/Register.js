import React from 'react';

class Register extends React.Component {
    render() {
        return (
            <div>
                <h1>Register</h1>
                <form>
                    <label>
                        First Name
                        <input placeholder="First Name"/>
                    </label>
                    <br/>
                    <label>
                        Last Name
                        <input placeholder="Last Name"/>
                    </label>
                    <br/>
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

                    <label>
                        Confirm
                        <input placeholder="Confirm Password"/>
                    </label>
                    <br/>

                    <button type="submit" onClick={(e) => e.preventDefault()}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Register;