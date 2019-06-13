import React from "react";
import { withStyles } from "@material-ui/core/styles";
import defaultStyles from "../../../defaultStyles";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { validateFormData } from "../../../apis/backend";
import SealValidationCard from "./SealValidationCard";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  ...defaultStyles(theme),
  progress: {
    margin: "auto"
  }
});

class CreateObservationValidator extends React.Component {
  state = {
    validationResult: null
  };

  componentDidMount = async () => {
    const validationResult = await validateFormData(this.props.formData);
    this.setState({
      validationResult: validationResult.data.data
    });
  };

  useNewSeal = () => {
    const { handleNext, formData } = this.props;
    handleNext(formData);
  };

  renderSpinner = () => {
    const { classes } = this.props;
    return <CircularProgress className={classes.progress} />;
  };

  renderValidationResult = () => {
    const { validationResult } = this.state;
    const { handleNext } = this.props;
    return (
      <>
        <Button onClick={this.useNewSeal}>New Seal</Button>
        {validationResult.seals
          .sort((a, b) => b.score - a.score)
          .map((seal, index) => (
            <SealValidationCard
              key={index}
              seal={seal}
              maxScore={validationResult.maxScore}
              handleNext={handleNext}
            />
          ))}
      </>
    );
  };

  render() {
    //const {classes} = this.props;
    if (!this.state.validationResult) {
      return this.renderSpinner();
    }
    return this.renderValidationResult();
  }
}

CreateObservationValidator.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    formData: state.form.createObservationForm.values
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(CreateObservationValidator)
);
