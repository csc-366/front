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
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  header: {
    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    minWidth: 180,
    maxWidth: 180
  },
  title: {
    marginLeft: theme.spacing.unit,
    flex: 1
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    minWidth: 180,
    maxWidth: 180
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
      name: "",
      mark: "",
      tag: "",
      tagColor: "",
      dateStart: "",
      dateEnd: "",
      moltStart: "",
      moltEnd: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tooltip title="Filter" enterDelay={300}>
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
                <CloseIcon />
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
            <ListItem alignItems="flex-start">
              <ListItemText>
                <Typography className={classes.header} variant="h6">
                  Seal
                </Typography>
                <TextField
                  label="Seal Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                  variant="outlined"
                />
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography className={classes.header} variant="h6">
                  Mark 1
                </Typography>
                <TextField
                  label="Mark Number"
                  className={classes.textField}
                  value={this.state.mark}
                  onChange={this.handleChange("mark")}
                  variant="outlined"
                />
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography className={classes.header} variant="h6">
                  Tag 1
                </Typography>
                <TextField
                  label="Tag Number"
                  className={classes.textField}
                  value={this.state.tag}
                  onChange={this.handleChange("tag")}
                  variant="outlined"
                />
                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.tagColor}
                    onChange={this.handleChange("tagColor")}
                    input={<OutlinedInput />}
                    displayEmpty
                  >
                    <MenuItem value="">Select Color</MenuItem>
                    <MenuItem value={"red"}>Red</MenuItem>
                    <MenuItem value={"green"}>Green</MenuItem>
                    <MenuItem value={"blue"}>Blue</MenuItem>
                  </Select>
                </FormControl>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography className={classes.header} variant="h6">
                  Last Observed
                </Typography>
                <TextField
                  label="Date Start"
                  type="date"
                  className={classes.textField}
                  onChange={this.handleChange("dateStart")}
                  value={this.state.dateStart}
                  variant="outlined"
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
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography className={classes.header} variant="h6">
                  Molt %
                </Typography>
                <TextField
                  label="Start %"
                  onChange={this.handleChange("moltStart")}
                  type="number"
                  className={classes.textField}
                  value={this.state.moltStart}
                  variant="outlined"
                />
                <TextField
                  label="End %"
                  onChange={this.handleChange("moltEnd")}
                  type="number"
                  className={classes.textField}
                  value={this.state.moltEnd}
                  variant="outlined"
                />
              </ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FilterDialog);
