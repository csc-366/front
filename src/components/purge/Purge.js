import React from 'react';
import defaultStyles from "../../defaultStyles";
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import {purgeStore} from "../../actions/purge";

const styles = theme => ({
    ...defaultStyles(theme),
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }
});

const Purge = (props) => {
    const {classes, persistor, purgeStore} = props;
    purgeStore(persistor);

    return (
        <div className={classes.root}>
            <CircularProgress className={classes.progress} />
        </div>
    )
};

export default connect(null, {purgeStore})(withStyles(styles)(Purge));