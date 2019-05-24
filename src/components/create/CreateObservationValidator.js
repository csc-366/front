import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../defaultStyles';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    ...defaultStyles(theme),
    progress: {
        margin: 'auto',
    }
});

class CreateObservationValidator extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <CircularProgress className={classes.progress} />
        )
    }
}

CreateObservationValidator.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateObservationValidator);
