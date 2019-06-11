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
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import SealFilter from "./SealFilter";
import ObservationFilter from "./ObservationFilter";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing.unit,
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
      filterSeals: null,
      filter: {}
    };
  }

  handleClickOpen = () => {
    let propsFilter = JSON.parse(JSON.stringify(this.props.filter));
    this.setState({
      open: true,
      filterSeals: this.props.filterSeals,
      filter: propsFilter
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  toggleFilter = bool => {
    if (bool) {
      this.setState({
        filterSeals: bool,
        filter: {
          name: "",
          markIndex: 0,
          marks: {},
          tagIndex: 0,
          tags: {},
          sex: "",
          dateStart: "",
          dateEnd: "",
          location: "",
          recorder: "",
          fieldLeaderIndex: 0,
          fieldLeaders: {},
          ageClass: "",
          ageDays: "",
          pupCount: "",
          molt: ""
        }
      });
    } else {
      this.setState({
        filterSeals: bool,
        filter: {
          open: false,
          dateStart: "",
          dateEnd: "",
          location: "",
          recorder: "",
          fieldLeaderIndex: 0,
          fieldLeaders: {},
          sex: "",
          ageClass: "",
          ageDays: "",
          pupCount: "",
          molt: ""
        }
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleChangeFilter = name => event => {
    let newFilter = this.state.filter;
    newFilter[name] = event.target.value;

    if (
      name === "sex" &&
      event.target.value !== "male" &&
      (newFilter.ageClass === "SA1" ||
        newFilter.ageClass === "SA2" ||
        newFilter.ageClass === "SA3" ||
        newFilter.ageClass === "SA4")
    ) {
      newFilter.ageClass = "";
    }

    this.setState({
      filter: newFilter
    });
  };

  removeItem = name => id => {
    let newFilter = this.state.filter;
    delete newFilter[name][id];

    this.setState({
      filter: newFilter
    });
  };

  editItem = name => id => field => event => {
    let newFilter = this.state.filter;
    newFilter[name][id][field] = event.target.value;

    this.setState({
      filter: newFilter
    });
  };

  addMark = () => {
    let newFilter = this.state.filter;

    newFilter.markIndex = this.state.filter.markIndex + 1;
    newFilter.marks[(this.state.filter.markIndex + 1).toString()] = {
      markNumber: "",
      markPosition: [],
      markDateStart: "",
      markDateEnd: ""
    };

    this.setState({
      filter: newFilter
    });
  };

  addTag = () => {
    let newFilter = this.state.filter;

    newFilter.tagIndex = this.state.filter.tagIndex + 1;
    newFilter.tags[(this.state.filter.tagIndex + 1).toString()] = {
      tagNumber: "",
      tagSide: "",
      tagColor: "",
      tagLocation: "",
      tagSpike: "",
      tagDateStart: "",
      tagDateEnd: ""
    };

    this.setState({
      filter: newFilter
    });
  };

  addFieldLeader = () => {
    let newFilter = this.state.filter;

    newFilter.fieldLeaderIndex = this.state.filter.fieldLeaderIndex + 1;
    newFilter.fieldLeaders[
      (this.state.filter.fieldLeaderIndex + 1).toString()
    ] = {
      name: ""
    };

    this.setState({
      filter: newFilter
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
              <IconButton onClick={this.handleClose} color="inherit">
                <CloseIcon />
              </IconButton>
              <Typography
                color="inherit"
                variant="h6"
                className={classes.title}
              >
                Filters
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  this.props.setFilter(
                    this.state.filterSeals,
                    this.state.filter
                  );
                  this.handleClose();
                }}
              >
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <Button
            variant="contained"
            color={this.state.filterSeals ? "secondary" : null}
            className={classes.button}
            onClick={() => this.toggleFilter(true)}
          >
            Seal
          </Button>
          <Button
            variant="contained"
            color={this.state.filterSeals ? null : "secondary"}
            className={classes.button}
            onClick={() => this.toggleFilter(false)}
          >
            Observation
          </Button>
          {this.state.filterSeals ? (
            <SealFilter
              filter={this.state.filter}
              handleChange={this.handleChangeFilter}
              removeItem={this.removeItem}
              editItem={this.editItem}
              addMark={this.addMark}
              addTag={this.addTag}
              addFieldLeader={this.addFieldLeader}
            />
          ) : (
            <ObservationFilter
              filter={this.state.filter}
              handleChange={this.handleChangeFilter}
              removeItem={this.removeItem}
              editItem={this.editItem}
              addFieldLeader={this.addFieldLeader}
            />
          )}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FilterDialog);
