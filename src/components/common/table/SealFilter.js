import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import OutlinedInput from "@material-ui/core/OutlinedInput";

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

class SealFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      markNumber: "",
      markPosition: [],
      markDateStart: "",
      markDateEnd: "",
      tagNumber: "",
      tagSide: "",
      tagColor: "",
      tagLocation: "",
      tagSpike: "",
      tagDateStart: "",
      tagDateEnd: "",
      sex: "",
      dateStart: "",
      dateEnd: "",
      location: "",
      recorder: "",
      fieldLeader: "",
      ageClass: "",
      ageDays: "",
      pupCount: "",
      moltStart: "",
      moltEnd: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <List>
        <ListItem alignItems="flex-start">
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
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
            <Typography className={classes.header} variant="subtitle2">
              Mark 1
            </Typography>
            <TextField
              label="Mark Number"
              className={classes.textField}
              value={this.state.markNumber}
              onChange={this.handleChange("markNumber")}
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <Select
                multiple
                value={this.state.markPosition}
                onChange={this.handleChange("markPosition")}
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
              onChange={this.handleChange("markDateStart")}
              value={this.state.markDateStart}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Deploy Date End"
              type="date"
              className={classes.textField}
              onChange={this.handleChange("markDateEnd")}
              value={this.state.markDateEnd}
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
            <Typography className={classes.header} variant="subtitle2">
              Tag 1
            </Typography>
            <TextField
              label="Tag Number"
              className={classes.textField}
              value={this.state.tagNumber}
              onChange={this.handleChange("tagNumber")}
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.tagColor}
                onChange={this.handleChange("tagColor")}
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
                value={this.state.tagSide}
                onChange={this.handleChange("tagSide")}
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
                value={this.state.tagLocation}
                onChange={this.handleChange("tagLocation")}
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
                value={this.state.tagSpike}
                onChange={this.handleChange("tagSpike")}
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
              onChange={this.handleChange("tagDateStart")}
              value={this.state.tagDateStart}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              label="Deploy Date End"
              type="date"
              className={classes.textField}
              onChange={this.handleChange("tagDateEnd")}
              value={this.state.tagDateEnd}
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
            <Typography className={classes.header} variant="subtitle2">
              Sex
            </Typography>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.sex}
                onChange={this.handleChange("sex")}
                input={<OutlinedInput labelWidth={0} />}
                displayEmpty
              >
                <MenuItem value="">
                  <i>Select Sex</i>
                </MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
              Last Observation Details
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
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.location}
                onChange={this.handleChange("location")}
                input={<OutlinedInput labelWidth={0} />}
                displayEmpty
              >
                <MenuItem value="">
                  <i>Select Location</i>
                </MenuItem>
                <MenuItem value={"ACU"}>ACU</MenuItem>
                <MenuItem value={"ACL"}>ACL</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Recorder"
              className={classes.textField}
              value={this.state.recorder}
              onChange={this.handleChange("recorder")}
              variant="outlined"
            />
            <TextField
              label="Field Leader"
              className={classes.textField}
              value={this.state.fieldLeader}
              onChange={this.handleChange("fieldLeader")}
              variant="outlined"
            />
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
              Last Observed Age
            </Typography>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.ageClass}
                onChange={this.handleChange("ageClass")}
                input={<OutlinedInput labelWidth={0} />}
                displayEmpty
              >
                <MenuItem value="">
                  <i>Select Age Class</i>
                </MenuItem>
                <MenuItem value={"P"}>Pup</MenuItem>
                <MenuItem value={"W"}>Weanling</MenuItem>
                <MenuItem value={"J"}>Juvenile</MenuItem>
                <MenuItem value={"A"}>Adult</MenuItem>
              </Select>
            </FormControl>
            {this.state.ageClass === "P" ? (
              <TextField
                label="Age in Days"
                className={classes.textField}
                value={this.state.ageDays}
                onChange={this.handleChange("ageDays")}
                type="number"
                variant="outlined"
              />
            ) : null}
              {this.state.sex === "female" && this.state.ageClass === "A" ? (
                  <TextField
                      label="Pup Count"
                      className={classes.textField}
                      value={this.state.pupCount}
                      onChange={this.handleChange("pupCount")}
                      type="number"
                      variant="outlined"
                  />
              ) : null}
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText>
            <Typography className={classes.header} variant="subtitle2">
              Last Observed Molt %
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
    );
  }
}

export default withStyles(styles)(SealFilter);
