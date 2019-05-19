import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import EditInfoButton from "./EditInfoButton";
import LogTable from "./LogTable";

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
            email: "joe@john.doe",
            role: "Citizen Joe",
            affiliation: "Doe"
        };
    }

    handleChange = type => value => {
        this.setState({[type]: value});
    };

    render() {
        const {classes} = this.props;
        const info = [
            {
                key: "firstName",
                desc: "First Name",
                value: this.state.firstName
            },
            {
                key: "lastName",
                desc: "Last Name",
                value: this.state.lastName
            },
            {
                key: "username",
                desc: "Username",
                value: this.state.username
            },
            {
                key: "password",
                desc: "Password",
                value: "*".repeat(this.state.password.length)
            },
            {
                key: "email",
                desc: "Email",
                value: this.state.email
            },
            {
                key: "role",
                desc: "Role",
                value: this.state.role
            },
            {
                key: "affiliation",
                desc: "Affiliation",
                value: this.state.affiliation
            }
        ];

        return (
            <React.Fragment>
                <List className={classes.root}>
                    {info.map(entry => (
                        <React.Fragment key={entry.key}>
                            <li>
                                <Typography
                                    className={classes.dividerFullWidth}
                                    color="textSecondary"
                                    variant="caption"
                                >
                                    {entry.desc}
                                </Typography>
                            </li>
                            <ListItem>
                                <ListItemText primary={entry.value}/>
                                <EditInfoButton
                                    desc={entry.desc}
                                    handleChange={this.handleChange(entry.key)}
                                />
                            </ListItem>
                            <Divider component="li"/>
                        </React.Fragment>
                    ))}
                </List>
                <LogTable/>
            </React.Fragment>
        );
    }
}

Account.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
