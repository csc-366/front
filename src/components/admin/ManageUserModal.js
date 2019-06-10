import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from "../../defaultStyles";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux';
import {setManagedUser, setUserState} from "../../actions/admin";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Icon from "@material-ui/core/Icon"
import Button from '@material-ui/core/Button';

const styles = theme => ({
    ...defaultStyles(theme),
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    icon: {
        marginRight: theme.spacing.unit
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class ManageUserModal extends React.Component {
    handleClose = () => {
        this.props.setManagedUser(null);
    };

    setUserState = (state) => () => {
        const {managedUser} = this.props;
        this.props.setUserState(managedUser, state);
    };

    renderStateManagement = (user) => {
        const {classes} = this.props;
        switch (user.status) {
            case 'Active':
                return (
                    <Button variant={"contained"} color={"secondary"} className={classes.button}
                            onClick={this.setUserState('Deactivated')}>Deactivate</Button>
                );
            case 'Deactivated':
                return (
                    <Button variant={"contained"} color={"primary"} className={classes.button}
                            onClick={this.setUserState('Active')}>Activate</Button>
                );
            case 'Pending':
                return (
                    <>
                        <Button variant={"contained"} color={"primary"} className={classes.button}
                                onClick={this.setUserState('Active')}>Activate</Button>
                        <Button variant={"contained"} color={"secondary"} className={classes.button}
                                onClick={this.setUserState('Deactivated')}>Deactivate</Button>
                    </>
                );
            default:
                return null
        }
    };

    renderManagedUser = () => {
        const user = this.props.managedUser;
        const {classes} = this.props;

        return (
            <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                    {`${user.firstName} ${user.lastName}`}
                </Typography>
                <List>
                    <ListItem>
                        <Icon className={classes.icon}>group</Icon>
                        <Typography>{user.affiliation}</Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Icon className={classes.icon}>email</Icon>
                        <Typography>{user.email}</Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Icon className={classes.icon}>person</Icon>
                        <Typography>{user.username}</Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Icon className={classes.icon}>gavel</Icon>
                        <Typography>{user.role}</Typography>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Icon className={classes.icon}>lock</Icon>
                        <Typography>{user.status}</Typography>
                    </ListItem>
                </List>
                <div className={classes.buttonGroup}>
                    {this.renderStateManagement(user)}
                    <Button variant={"contained"} color={"primary"} className={classes.button}>Modify
                        Permissions</Button>
                </div>
            </div>
        )
    };

    renderUserOptions = () => {
        return (
            <div>Options</div>
        )
    };

    render() {
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={!!this.props.managedUser}
                onClose={this.handleClose}
            >
                {this.props.managedUser ? this.renderManagedUser() : null}
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        managedUser: state.admin.managedUser
    }
};

export default connect(mapStateToProps, {setManagedUser, setUserState})(withStyles(styles)(ManageUserModal));