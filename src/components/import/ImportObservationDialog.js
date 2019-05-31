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
    }
});

class ImportObservationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            fileNames: []
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    renderFileNames = () => {
        if (this.state.fileNames.length > 0) {
            return this.state.fileNames.map((fileName, index) => {
                return (<Typography key={index}>{fileName}</Typography>)
            })
        }
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
                                   fileNames: Object.values(e.target.files).filter(file => file.name.endsWith(".csv")).map(file => file.name)
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
