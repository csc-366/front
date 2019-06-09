import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    minWidth: 180,
    maxWidth: 180
  },
});

class SealFilterFieldLeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, handleChange, fieldLeader } = this.props;

    return (
      <ListItem>
        <ListItemText>
          <TextField
            label={"Field Leader " + this.props.numFieldLeader}
            className={classes.textField}
            value={fieldLeader.name}
            onChange={handleChange("name")}
            variant="outlined"
          />
        </ListItemText>
        <IconButton
          edge="start"
          color="inherit"
          onClick={this.props.removeFieldLeader}
        >
          <CloseIcon />
        </IconButton>
      </ListItem>
    );
  }
}

export default withStyles(styles)(SealFilterFieldLeader);
