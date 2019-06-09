import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  header: {
    marginLeft: theme.spacing.unit
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    minWidth: 180,
    maxWidth: 180
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    minWidth: 180,
    maxWidth: 180
  }
});

class SealFilterMark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, handleChange, mark } = this.props;

    return (
      <ListItem>
        <ListItemText>
          <Typography className={classes.header} variant="subtitle2">
            Mark {this.props.numMark}
          </Typography>
          <TextField
            label="Mark Number"
            className={classes.textField}
            value={mark.markNumber}
            onChange={handleChange("markNumber")}
            variant="outlined"
          />
          <FormControl className={classes.formControl}>
            <Select
              multiple
              value={mark.markPosition}
              onChange={handleChange("markPosition")}
              input={<OutlinedInput labelWidth={0} />}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <i>Select Position(s)</i>
              </MenuItem>
              <MenuItem value={"left"}>Left</MenuItem>
              <MenuItem value={"right"}>Right</MenuItem>
              <MenuItem value={"back"}>Back</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Deploy Date Start"
            type="date"
            className={classes.textField}
            value={mark.markDateStart}
            onChange={handleChange("markDateStart")}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Deploy Date End"
            type="date"
            className={classes.textField}
            value={mark.markDateEnd}
            onChange={handleChange("markDateEnd")}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </ListItemText>
        <IconButton
          edge="start"
          color="inherit"
          onClick={this.props.removeMark}
        >
          <CloseIcon />
        </IconButton>
      </ListItem>
    );
  }
}

export default withStyles(styles)(SealFilterMark);
