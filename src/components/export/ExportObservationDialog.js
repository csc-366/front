import React from 'react';
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import defaultStyles from '../../defaultStyles';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import {backend} from "../../apis/backend";

const styles = theme => ({
    ...defaultStyles(theme),
    importButton: {
        marginRight: theme.spacing.unit,
        backgroundColor: 'gray'
    },
    input: {
        display: 'none'
    },
    importIcon: {
        marginRight: theme.spacing.unit
    },
    fileNameContainer: {
        margin: theme.spacing.unit
    },
    errorHeader: {
        marginLeft: theme.spacing.unit
    }
});

class ExportObservationDialog extends React.Component {
    state = {
        open: false,
        submitted: false,
        exportType: 'pending'
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = async () => {
        this.setState({open: false})
    };

    exportData = async () => {
        const {exportType} = this.state;
        setTimeout(() => {
            const response = {
                file: ``
            };

            window.open(response.file);
        }, 100)
    };

    renderDialogContent = () => {
        const {classes} = this.props;
        return (
            <DialogContent>
                <Select value={this.state.exportType} onChange={(event) => {this.setState({exportType: event.target.value})}}>
                    <MenuItem value={'pending'}>Pending Observations</MenuItem>
                    <MenuItem value={'complete'}>Complete Observations</MenuItem>
                </Select>
                <Button color={'primary'} onClick={this.exportData}>Export</Button>
            </DialogContent>
        )
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
                <DialogTitle id={"form-dialog-title"}>Export Observations</DialogTitle>
                {this.renderDialogContent()}
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <Button variant={"contained"} color={"inherit"} className={classes.importButton}
                        onClick={this.handleClickOpen}>
                    <Icon className={classes.importIcon}>save_alt</Icon>
                    Export
                </Button>
                {this.renderDialog()}
            </>
        )
    }
}

ExportObservationDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExportObservationDialog);
