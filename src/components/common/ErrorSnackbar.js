import React from 'react';
import defaultStyles from '../../defaultStyles';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {clearError} from "../../actions/error";

const styles = theme => ({
    ...defaultStyles(theme),
    error: {
        backgroundColor: 'red'
    },
    errorMessage: {
        display: 'flex',
        flexDirection: 'row',
    },
    errorText: {
        color: 'white',
        paddingLeft: theme.spacing.unit
    }
});

class ErrorSnackbar extends React.Component {
    onSnackbarClose = () => {
        this.props.clearError()
    };

    render() {
        const {classes, error} = this.props;
        return (
            <Snackbar
                open={!!error}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                autoHideDuration={6000}
                onClose={this.onSnackbarClose}
            >
                <SnackbarContent
                    className={classes.error}
                    aria-describedby={"client-snackbar"}
                    message={
                        <span id={"client-snackbar"} className={classes.errorMessage}>
                                <Icon>error</Icon>
                                <Typography variant="subtitle1"
                                            className={classes.errorText}>{this.props.error}</Typography>
                            </span>
                    }
                    action={
                        <IconButton key={"close"} aria-label={"Close"} color={"inherit"} onClick={this.onSnackbarClose}>
                            <Icon>close</Icon>
                        </IconButton>
                    }
                />
            </Snackbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: (!!state.error.error) ? state.error.error.message : null
    }
};

export default connect(mapStateToProps, {clearError})(withStyles(styles)(ErrorSnackbar));