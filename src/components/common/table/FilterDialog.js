import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

const styles = theme => ({
    appBar: {
        position: "relative"
    },
    title: {
        marginLeft: theme.spacing.unit * 2,
        flex: 1
    }
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class FilterDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Tooltip title="Filter">
                    <IconButton aria-label="Filter" onClick={this.handleClickOpen}>
                        <Icon>filter_list</Icon>
                    </IconButton>
                </Tooltip>
                <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={this.handleClose}
                                aria-label="Close"
                                color="inherit"
                            >
                                <CloseIcon/>
                            </IconButton>
                            <Typography
                                color="inherit"
                                variant="h6"
                                className={classes.title}
                            >
                                Filters
                            </Typography>
                            <Button color="inherit" onClick={this.handleClose}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText
                                primary="Default notification ringtone"
                                secondary="Tethys"
                            />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FilterDialog);
