import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import EditInfoButton from "./EditInfoButton";
import Grid from "@material-ui/core/Grid";
import Header from "../common/Header";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing.unit * 2}px`
  },
  formControl: {
    minWidth: 150
  }
});

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "John",
      lastName: "Doe",
      username: "joe",
      email: "joe@john.doe",
      affiliation: "Doe",
      role: "Admin",
      permissions: {
        1: true,
        2: false,
        3: true,
        4: false,
        5: true,
        6: false
      }
    };
  }

  handleDone = type => value => {
    this.setState({ [type]: value });
  };

  handleChange = type => event => {
    this.setState({ [type]: event.target.value });
  };

  render() {
    const { classes } = this.props;
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
        key: "email",
        desc: "Email",
        value: this.state.email
      },
      {
        key: "affiliation",
        desc: "Affiliation",
        value: this.state.affiliation
      }
    ];

    const permissions = [
      {
        key: 1,
        id: 1,
        name: "Adding Observations"
      },
      {
        key: 2,
        id: 2,
        name: "Approving Observations"
      },
      {
        key: 3,
        id: 3,
        name: "Modifying Observations"
      },
      {
        key: 4,
        id: 4,
        name: "Archiving Observations"
      },
      {
        key: 5,
        id: 5,
        name: "Mass Importing Observations"
      },
      {
        key: 6,
        id: 6,
        name: "Mass Exporting Observations"
      }
    ];

    return (
      <React.Fragment>
        <Header />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.dividerFullWidth}>
                Personal Information
              </Typography>
              <List>
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
                      <ListItemText primary={entry.value} />
                      <EditInfoButton
                        desc={entry.desc}
                        handleChange={this.handleDone(entry.key)}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
                <li>
                  <Typography
                    className={classes.dividerFullWidth}
                    color="textSecondary"
                    variant="caption"
                  >
                    Role
                  </Typography>
                </li>
                <ListItem>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.state.role}
                      onChange={this.handleChange("role")}
                      displayEmpty
                    >
                      <MenuItem value={"Citizen Scientist"}>
                        Citizen Scientist
                      </MenuItem>
                      <MenuItem value={"Scientist"}>Scientist</MenuItem>
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
                <Divider component="li" />
              </List>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.dividerFullWidth}>
                Permission List
              </Typography>
              <List>
                {permissions.map(permission => (
                  <React.Fragment key={permission.key}>
                    <ListItem>
                      <ListItemText
                        primary={permission.name}
                        secondary={
                          this.state.permissions[permission.id]
                            ? "Enabled"
                            : "Disabled"
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
