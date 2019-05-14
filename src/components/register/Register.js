import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',

        height: '100vh',

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: theme.palette.primary.main
    },
    paper: {
        padding: theme.spacing.unit * 3,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    textField: {
        width: '20vw'
    },
    button: {
        margin: theme.spacing.unit,
        alignSelf: 'center'
    },
    loginGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h2">Register</Typography>
                    {/*TODO: Hook up redux form - https://github.com/erikras/redux-form-material-ui*/}
                    <form className={classes.formContainer} noValidate autoComplete="off">
                        <TextField
                            id={"firstName"}
                            label={"First Name"}
                            className={classes.textField}
                            value={this.state.firstName}
                            onChange={this.handleChange('firstName')}
                            margin={"normal"}
                        />

                        <TextField
                            id={"lastName"}
                            label={"Last Name"}
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange('lastName')}
                            margin={"normal"}
                        />

                        <TextField
                            id={"email"}
                            label={"Email"}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin={"normal"}
                        />

                        <TextField
                            id="username"
                            label={"Username"}
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                        />

                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type={"password"}
                            autoComplete={"current-password"}
                            margin={"normal"}
                        />

                        <TextField
                            id={"confirmPassword"}
                            label={"Confirm Password"}
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange('confirmPassword')}
                            margin={"normal"}
                        />

                        <div className={classes.loginGroup}>
                            <Button variant="contained" color={"primary"}
                                    className={classes.button} component={Link} to="/dashboard">Register</Button>
                            <Typography variant={"body1"} className={classes.loginLink}>or <Link to={"/login"}>log in</Link></Typography>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);