import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import defaultStyles from "../../../defaultStyles";

const styles = theme => ({
  ...defaultStyles(theme)
});

class CreateObservationConfirmation extends React.Component {
  render() {
    const { observation } = this.props;
    console.log(observation);
    return <Typography>Confirm Submission</Typography>;
  }
}

export default withStyles(styles)(CreateObservationConfirmation);
