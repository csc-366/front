import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PendingObservationForm from './PendingObservationForm';

import PropTypes from 'prop-types';
import defaultStyles from '../../defaultStyles';
import {getPendingObservation} from "../../actions/pendingObservation";
import {connect} from 'react-redux';

const styles = theme => ({
    ...defaultStyles(theme),
    header: {
        fontWeight: 'bold'
    }
});

class PendingObservationDetailsModal extends React.Component {
    constructor(props) {
        super(props);
        const {open} = props;
        this.state = {
            open
        };
    }

    componentDidUpdate(prevProps) {
        const {observation, ObservationId, getPendingObservation} = this.props;
        if (prevProps.open !== this.props.open) {
            this.setState({open: this.props.open})
        }
        if (prevProps.ObservationId !== this.props.ObservationId) {
            if (!observation || observation.id !== ObservationId) {
                getPendingObservation(ObservationId);
            }
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.props.handleClose();
    };

    renderDialogContent = (observation) => {
        if (!observation) {
            return (<DialogContentText id={"alert-dialog-description"}>Loading...</DialogContentText>)
        }

        const {ObservationId} = this.props;

        return (
            <PendingObservationForm ObservationId={ObservationId} observation={observation}/>
        )
    };

    render() {
        const {observation} = this.props;
        const {open} = this.state;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Details</DialogTitle>
                    <DialogContent>
                        {this.renderDialogContent(observation)}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PendingObservationDetailsModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    ObservationId: PropTypes.number
};

const mapStateToProps = state => {
    return {
        observation: state.observations.currentPending
    };
};

export default connect(mapStateToProps, {getPendingObservation})(withStyles(styles)(PendingObservationDetailsModal));
