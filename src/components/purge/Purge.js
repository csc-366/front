import React from 'react';
import defaultStyles from "../../defaultStyles";
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from '../../history';

const styles = theme => ({
    ...defaultStyles(theme),
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }
});

class Purge extends React.Component {
    async componentDidMount() {
        const {persistor} = this.props;
        await persistor.purge();
        await persistor.flush();
        await persistor.pause();
        history.replace('/');
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CircularProgress className={classes.progress}/>
            </div>
        )
    }
}

export default withStyles(styles)(Purge);