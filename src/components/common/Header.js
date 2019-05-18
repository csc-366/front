import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreateModalButton from "../create/CreateObservationDialog";
import {Link} from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
};

const Header = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position={"static"}>
                <Toolbar>
                    <Link to={'/'} className={[classes.link, classes.grow].join(' ')}>
                        <Typography variant={"h6"} color={"inherit"}>
                            SeaQL
                        </Typography>
                    </Link>
                    <CreateModalButton/>
                    <Button color={"inherit"}>Account</Button>
                    <Button color={"inherit"}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);