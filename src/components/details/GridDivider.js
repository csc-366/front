import React from 'react';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types'

const styles = {
    divider: {
        marginTop: 10,
        marginBottom: 10
    }
};

const GridDivider = (props) => {
    const {classes} = props;
    return (
        <Grid item xs={12}>
            <Divider className={classes.divider}/>
        </Grid>
    )
};

GridDivider.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GridDivider);