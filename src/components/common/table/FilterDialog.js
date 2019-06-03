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
import {withStyles} from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    appBar: {
        position: "relative"
    },
    textField: {
        marginRight: theme.spacing.unit * 2
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
            open: false,
            name: null,
            mark: null,
            tag: null,
            dateStart: null,
            dateEnd: null,
            moltStart: null,
            moltEnd: null
        };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
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
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
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
                        <ListItem>
                            <TextField
                                label="Seal Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange("name")}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <TextField
                                label="Mark Number"
                                className={classes.textField}
                                value={this.state.mark}
                                onChange={this.handleChange("mark")}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <TextField
                                label="Tag Number"
                                className={classes.textField}
                                value={this.state.tag}
                                onChange={this.handleChange("tag")}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <TextField
                                label="Date Start"
                                type="date"
                                className={classes.textField}
                                onChange={this.handleChange("dateStart")}
                                value={this.state.dateStart}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                label="Date End"
                                type="date"
                                className={classes.textField}
                                onChange={this.handleChange("dateEnd")}
                                value={this.state.dateEnd}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <TextField
                                label="Molt Start"
                                onChange={this.handleChange("moltStart")}
                                type="number"
                                className={classes.textField}
                                value={this.state.moltStart}
                            />
                            <TextField
                                label="Molt End"
                                onChange={this.handleChange("moltEnd")}
                                type="number"
                                className={classes.textField}
                                value={this.state.moltEnd}
                            />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(FilterDialog);
