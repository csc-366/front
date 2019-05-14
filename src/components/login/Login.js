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
    }
});

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
                        />

                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type={"password"}
                            autoComplete={"current-password"}
                            margin={"normal"}
                        />


                        <div className={classes.loginGroup}>
                            <Button variant="contained" color={"primary"}
                                    className={classes.button} component={Link} to="/dashboard">Login</Button>
                            <Typography variant={"body1"} className={classes.loginLink}>or <Link to={"/register"}>register</Link></Typography>
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

export default withStyles(styles)(Login);