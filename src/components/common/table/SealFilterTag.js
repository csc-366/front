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

class SealFilterTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, handleChange, tag } = this.props;

    return (
      <ListItem>
        <ListItemText>
          <Typography className={classes.header} variant="subtitle2">
            Tag {this.props.numTag}
          </Typography>
          <TextField
            label="Tag Number"
            className={classes.textField}
            value={tag.tagNumber}
            onChange={handleChange("tagNumber")}
            variant="outlined"
          />
          <FormControl className={classes.formControl}>
            <Select
              value={tag.tagColor}
              onChange={handleChange("tagColor")}
              input={<OutlinedInput labelWidth={0} />}
              displayEmpty
            >
              <MenuItem value="">
                <i>Select Color</i>
              </MenuItem>
              <MenuItem value={"red"}>Red</MenuItem>
              <MenuItem value={"green"}>Green</MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              value={tag.tagSide}
              onChange={handleChange("tagSide")}
              input={<OutlinedInput labelWidth={0} />}
              displayEmpty
            >
              <MenuItem value="">
                <i>Select Side</i>
              </MenuItem>
              <MenuItem value={"left"}>Left</MenuItem>
              <MenuItem value={"right"}>Right</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              value={tag.tagLocation}
              onChange={handleChange("tagLocation")}
              input={<OutlinedInput labelWidth={0} />}
              displayEmpty
            >
              <MenuItem value="">
                <i>Select Location</i>
              </MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              value={tag.tagSpike}
              onChange={handleChange("tagSpike")}
              input={<OutlinedInput labelWidth={0} />}
              displayEmpty
            >
              <MenuItem value="">
                <i>Select Spike</i>
              </MenuItem>
              <MenuItem value={"so"}>Spike Out</MenuItem>
              <MenuItem value={"si"}>Spike In</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Deploy Date Start"
            type="date"
            className={classes.textField}
            onChange={handleChange("tagDateStart")}
            value={tag.tagDateStart}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Deploy Date End"
            type="date"
            className={classes.textField}
            onChange={handleChange("tagDateEnd")}
            value={tag.tagDateEnd}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </ListItemText>
        <IconButton edge="start" color="inherit" onClick={this.props.removeTag}>
          <CloseIcon />
        </IconButton>
      </ListItem>
    );
  }
}

export default withStyles(styles)(SealFilterTag);
