/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import defaultStyles from '../../defaultStyles';
import CreateObservationStepper from "./CreateObservationStepper";

const styles = theme => {
    return {
        ...defaultStyles(theme),
        root: {
            display: 'flex',
            flexDirection: 'column',
        }
    }
};

class CreateObservationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    renderDialog = () => {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.open}
                className={classes.dialog}
                onClose={this.handleClose}
                fullWidth
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id={"form-dialog-title"}>Create Observation</DialogTitle>
                {this.renderDialogContent()}
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    };

    renderDialogContent = () => {
        //const {classes} = this.props;
        return (
            <DialogContent>
                <CreateObservationStepper/>
                {/*<CreateObservationForm/>*/}
            </DialogContent>

        );
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    <Icon className={classes.buttonIcon}>add</Icon>
                    Create
                </Button>
                {this.renderDialog()}
            </div>
        )
    }
}

CreateObservationDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateObservationDialog);
