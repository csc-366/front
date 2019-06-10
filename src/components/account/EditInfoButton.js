import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  button1: {
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  button2: {
    marginBottom: theme.spacing.unit
  }
});

class EditInfoButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEdit = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Change {this.props.desc}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              onChange={this.handleEdit}
            />
          </DialogContent>
          <DialogActions>
            <Button className={classes.button2} onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              className={classes.button1}
              onClick={() => {
                this.props.handleChange(this.state.value);
                this.handleClose();
              }}
              color="primary"
              variant="outlined"
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditInfoButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditInfoButton);
