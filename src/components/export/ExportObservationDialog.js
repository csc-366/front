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
    },
    selectField: {
        marginLeft: theme.spacing.unit
    }
});

class ExportObservationDialog extends React.Component {
    state = {
        open: false,
        submitted: false,
        exportType: 'pending',
        exportFormat: 'csv'
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = async () => {
        this.setState({open: false})
    };

    renderDialogContent = () => {
        const {classes} = this.props;
        const {exportType, exportFormat} = this.state;
        return (
            <DialogContent>
                <Select value={this.state.exportType} onChange={(event) => {
                    this.setState({exportType: event.target.value})
                }} className={classes.selectField}>
                    <MenuItem value={'pending'}>Pending Observations</MenuItem>
                    <MenuItem value={'complete'}>Complete Observations</MenuItem>
                </Select>
                <Select value={this.state.exportFormat} onChange={(event) => {
                    this.setState({exportFormat: event.target.value})
                }} className={classes.selectField}>
                    <MenuItem value={'csv'}>CSV</MenuItem>
                    <MenuItem value={'json'}>JSON</MenuItem>
                </Select>
                <Button color={'primary'} component={'a'} download target={'_blank'}
                        href={`http://localhost:3001/export/${exportFormat}/${exportType}`}>Export</Button>
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
