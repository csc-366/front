import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing.unit * 2}px`
    }
});

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "John",
            lastName: "Doe",
            username: "joe",
            password: "password",
            email: "joe@john.doe"
        };
    }

    render() {
        const {classes} = this.props;
        const info = [
            {
                type: "Name",
                value: this.state.firstName + " " + this.state.lastName
            },
            {
                type: "Username",
                value: this.state.username
            },
            {
                type: "Password",
                value: "*".repeat(this.state.password.length)
            },
            {
                type: "Email",
                value: this.state.email
            }
        ];

        return (
            <List className={classes.root}>
                {info.map(entry => (
                    <React.Fragment>
                        <li>
                            <Typography
                                className={classes.dividerFullWidth}
                                color="textSecondary"
                                variant="caption"
                            >
                                {entry.type}
                            </Typography>
                        </li>
                        <ListItem>
                            <ListItemText primary={entry.value}/>
                            <Button>Edit</Button>
                        </ListItem>
                        <Divider component="li"/>
                    </React.Fragment>
                ))}
            </List>
        );
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
