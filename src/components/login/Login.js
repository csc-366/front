import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {setUserInformation, login} from "../../actions/user";
import {clearError} from "../../actions/error";
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
        alignItems: 'flex-start',
    },
    textField: {
        width: '20vw',
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
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        if(!!this.props.username) {
            history.push('/dashboard')
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {username, password} = this.state;
        if (this.state.username && this.state.password) {
            this.props.login(username, password);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h2">Sign In</Typography>
                    {/*TODO: Hook up redux form - https://github.com/erikras/redux-form-material-ui*/}
                    <form className={classes.formContainer} noValidate autoComplete="off">
                        <TextField
                            id="username"
                            label={"Username"}
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange('username')}
                            margin="normal"
                            onKeyPress={e => (e.key === 'Enter') ? this.handleSubmit() : null}
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


                        <div className={classes.loginGroup}>
                            <Button variant="contained" color={"primary"}
                                    className={classes.button} onClick={this.handleSubmit}>Login</Button>
                            <Typography variant={"body1"} className={classes.loginLink}>or <Link
                                to={"/register"}>register</Link></Typography>
                        </div>
                    </form>
                </Paper>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        username: state.user.username,
        password: state.user.password,
        error: state.user.logInError
    }
};

export default connect(mapStateToProps, {setUserInformation, login, clearError})(withStyles(styles)(Login));