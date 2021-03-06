import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import history from "../../history";

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',

        height: '100vh',

        alignItems: 'center',
        justifyContent: 'center',

        backgroundImage: `url(https://images.unsplash.com/photo-1550940934-bc02c7c59618?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3900&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        padding: theme.spacing.unit * 6,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '400px',
        maxWidth: '80vw'
    },
    button: {
        margin: theme.spacing.unit
    }
});

class Cover extends React.Component {
    componentDidMount() {
        if(this.props.isLoggedIn) {
            history.replace('/dashboard')
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography variant="h1">
                        SeaQL
                    </Typography>
                    <Button variant="contained" color="primary" className={classes.button}
                            component={Link} to="/login">
                        Log In
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}
                            component={Link} to="/register">
                        Register
                    </Button>
                </Paper>
            </div>
        )
    }
}

Cover.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.user.username && (state.user.status === 'Active')
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Cover));