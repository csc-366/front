import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {register} from "../../actions/user";
import {clearError} from "../../actions/error";
import {connect} from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import history from "../../history";

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
    },
    error: {
        backgroundColor: 'red'
    },
    errorMessage: {
        display: 'flex',
        flexDirection: 'row',
    },
    errorText: {
        color: 'white',
        paddingLeft: theme.spacing.unit
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

    componentDidMount() {
        if (this.props.isLoggedIn) {
            history.push('/dashboard')
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {firstName, lastName, email, username, password, confirmPassword} = this.state;
        this.props.register(firstName, lastName, email, username, password, confirmPassword);
    };

    onSnackbarClose = () => {
        this.props.clearError()
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Snackbar
                    open={!!this.props.error}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                    autoHideDuration={6000}
                    onClose={this.onSnackbarClose}
                >
                    <SnackbarContent
                        className={classes.error}
                        aria-describedby={"client-snackbar"}
                        message={
                            <span id={"client-snackbar"} className={classes.errorMessage}>
                                <Icon>error</Icon>
                                <Typography variant="subtitle1" className={classes.errorText}>{this.props.error}</Typography>
                            </span>
                        }
                        action={
                            <IconButton key={"close"} aria-label={"Close"} color={"inherit"} onClick={this.onSnackbarClose}>
                                <Icon>close</Icon>
                            </IconButton>
                        }
                    />
                </Snackbar>
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
                            onChange={this.handleChange('password')}
                            margin={"normal"}
                            onKeyPress={e => (e.key === 'Enter') ? this.handleSubmit() : null}
                        />

                        <TextField
                            id={"confirmPassword"}
                            label={"Confirm Password"}
                            className={classes.textField}
                            type={"password"}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange('confirmPassword')}
                            margin={"normal"}
                            onKeyPress={e => (e.key === 'Enter') ? this.handleSubmit() : null}
                        />

                        <div className={classes.loginGroup}>
                            <Button variant="contained" color={"primary"}
                                    className={classes.button} onClick={this.handleSubmit}>Register</Button>
                            <Typography variant={"body1"} className={classes.loginLink}>or <Link to={"/login"}>log
                                in</Link></Typography>
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

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.user.username && (state.user.status === 'Active'),
        username: state.user.username,
        password: state.user.password,
        error: state.user.registerError
    }
};

export default connect(mapStateToProps, {register, clearError})(withStyles(styles)(Register));