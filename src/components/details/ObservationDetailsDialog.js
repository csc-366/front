import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import GridDivider from './GridDivider';

import PropTypes from 'prop-types';
import defaultStyles from '../../defaultStyles';
import {getObservation} from '../../util/db'

const styles = theme => ({
    ...defaultStyles(theme),
    header: {
        fontWeight: 'bold'
    }
});

class ObservationDetailsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            observation: getObservation(props.observationId)
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({open: this.props.open, observation: getObservation(this.props.observationId)})
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    renderDialogContent = (observation) => {
        if (!observation) {
            return (<DialogContentText id={"alert-dialog-description"}>Loading...</DialogContentText>)
        }

        const {date, fieldLeaders, location, sex, age} = observation;
        const {classes} = this.props;

        return (
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant={"body1"} className={classes.header}>Date</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={"body1"}>{date}</Typography>
                </Grid>

                <GridDivider/>

                <Grid item xs={6}>
                    <Typography variant={"body1"} className={classes.header}>Field Leaders</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={"body1"}>{fieldLeaders}</Typography>
                </Grid>

                <GridDivider/>

                <Grid item xs={6}>
                    <Typography variant={"body1"} className={classes.header}>Location</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={"body1"}>{location}</Typography>
                </Grid>

                <GridDivider/>

                <Grid item xs={6}>
                    <Typography variant={"body1"} className={classes.header}>Sex</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={"body1"}>{sex}</Typography>
                </Grid>

                <GridDivider/>

                <Grid item xs={6}>
                    <Typography variant={"body1"} className={classes.header}>Age</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant={"body1"}>{age}</Typography>
                </Grid>
            </Grid>
        )
    };

    render() {
        const observation = this.state.observation;
        return (
            <div>
                <Dialog
                    open={this.state.open}
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

ObservationDetailsDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    observationId: PropTypes.number.isRequired
};

export default withStyles(styles)(ObservationDetailsDialog);
