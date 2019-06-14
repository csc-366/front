import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreateModalButton from "../create/CreateObservationDialog";
import ImportModalButton from '../import/ImportObservationDialog';
import ExportModalButton from '../export/ExportObservationDialog';
import {logout} from "../../actions/user";
import {connect} from 'react-redux';

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

class Header extends React.Component {
    logout = () => {
        this.props.logout();
    };

    renderAdminFunctions = () => {
        const {user} = this.props;
        if (user && user.role === 'Admin') {
            return (
                <>
                    <Button color={"inherit"} component={Link} to="/manage_users">Manage Users</Button>
                    <Button color={"inherit"} component={Link} to="/admin">Administration</Button>
                </>
            )
        }
        return null;
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position={"static"}>
                    <Toolbar>
                        <div className={classes.grow}>
                            <Link to={'/'} className={classes.link}>
                                <Typography variant={"h6"} color={"inherit"}>
                                    SeaQL
                                </Typography>
                            </Link>
                        </div>
                        <ExportModalButton/>
                        <ImportModalButton/>
                        <CreateModalButton/>
                        <Button color={"inherit"} component={Link} to="/view">View Data</Button>
                        {this.renderAdminFunctions()}
                        <Button color={"inherit"} component={Link} to="/account">Account</Button>
                        <Button color={"inherit"} onClick={this.logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps, {logout})(withStyles(styles)(Header));