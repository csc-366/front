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
import Typography from '@material-ui/core/Typography'
import {backend} from "../../apis/backend";

const styles = theme => ({
    ...defaultStyles(theme),
    importButton: {
        marginRight: theme.spacing.unit,
        backgroundColor: 'green'
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

class ImportObservationDialog extends React.Component {
    state = {
        open: false,
        submitted: false,
        files: [],
        errors: {}
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = (closeType) => async () => {
        if (closeType === 'submit') {
            const errors = await this.pushFiles();
            if (!errors) {
                this.setState({open: false});
            } else {
                this.setState({errors, submitted: true})
            }
        } else {
            this.setState({open: false})
        }
    };

    renderFileNames = () => {
        if (this.state.files.length > 0) {
            return this.state.files.map((file, index) => {
                return (<Typography key={index}>{file.name}</Typography>)
            })
        }
    };

    renderErrorMessage = (errors) => {
        const {ingestErrors, parseErrors} = errors.data;
        if (ingestErrors.hadFatalError) {
            console.log(parseErrors);
            return (
                <>
                    Rejected
                    {
                        Object.entries(ingestErrors.errors).map(([rowNumber, error]) => {
                            return (<Typography key={rowNumber}>Row {rowNumber}: {error}</Typography>)
                        })
                    }
                    {
                        Object.entries(parseErrors).map(([rowNumber, error]) => {
                            return (<Typography key={rowNumber}>Row {rowNumber}: {Object.values(error).join(', ')}</Typography>)
                        })
                    }
                </>
            )
        } else {
            return (<Typography>{Object.values(ingestErrors.errors).length} warnings</Typography>)
        }
    };

    renderErrors = () => {
        const {classes} = this.props;
        if (this.state.submitted) {
            return Object.entries(this.state.errors).map(([fileName, errors]) => {
                return (
                    <div key={fileName}>
                        <Typography
                            variant={"h6"}
                            className={classes.errorHeader}>
                            {fileName}: {this.renderErrorMessage(errors)}
                        </Typography>
                    </div>
                )
            })
        }
    };

    pushFiles = async () => {
        const {files} = this.state;
        const errors = {};
        for (let i = 0; i < files.length; i++) {
            const currentFile = files[i];
            const formData = new FormData();
            formData.set('data', currentFile);
            const response = await backend.post('/etl', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            errors[currentFile.name] = response.data;
        }
        return errors;
    };

    renderDialogContent = () => {
        const {classes} = this.props;
        return (
            <DialogContent>
                <Button component="label" variant={"contained"}>
                    Select File
                    <input type={"file"} accept={".csv"} multiple id={"csv-upload"} className={classes.input}
                           onChange={e => {
                               this.setState({
                                   files: Object.values(e.target.files).filter(file => file.name.endsWith(".csv"))
                               })
                           }}/>
                </Button>
                <div className={classes.fileNameContainer}>
                    {this.renderFileNames()}
                </div>
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
                <DialogTitle id={"form-dialog-title"}>Import Observations</DialogTitle>
                {this.renderDialogContent()}
                {this.renderErrors()}
                <DialogActions>
                    <Button onClick={this.handleClose('cancel')} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose('submit')} color="primary">
                        Submit
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
                    <Icon className={classes.importIcon}>cloud_upload</Icon>
                    Import
                </Button>
                {this.renderDialog()}
            </>
        )
    }
}

ImportObservationDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImportObservationDialog);
