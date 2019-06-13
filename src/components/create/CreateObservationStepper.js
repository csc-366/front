import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateObservationForm from "./CreateObservationForm";
import CreateObservationValidator from "./validate/CreateObservationValidator";
import CreateObservationConfirmation from "./confirm/CreateObservationConfirmation";
import { setFormData } from "../../actions/createObservation";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { setError } from "../../actions/error";
import backend from "../../apis/backend";

const styles = theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  stepperButtonContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  stepContentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  }
});

function getSteps() {
  return ["Enter", "Validate", "Confirm"];
}

class CreateObservationStepper extends React.Component {
  state = {
    activeStep: 0,
    observation: null
  };

  handleNext = (observation = null) => {
    const { formData, setError } = this.props;
    const { activeStep } = this.state;
    const steps = getSteps();
    if (formData.location && formData.date && activeStep === 0) {
      if (!formData.tags && !formData.location) {
        setError("At least one tag/mark is required");
      } else {
        this.setState(state => ({
          activeStep: state.activeStep + 1
        }));
      }
    } else if (observation && activeStep === 1) {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
        observation
      }));
    } else if (activeStep === steps.length - 1) {
      this.submitObservation(this.state.observation);
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    } else {
      setError("Location and Date Required to Continue");
    }
  };

  submitObservation = async observation => {
    if (!!observation) {
      try {
        await backend.post("/observations", observation);
      } catch (e) {
        this.props.setError(e.response.data.message);
      }
    }
  };

  setObservation = observation => {
    this.setState({ observation });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <CreateObservationForm />;
      case 1:
        return <CreateObservationValidator handleNext={this.handleNext} />;
      case 2:
        return (
          <CreateObservationConfirmation observation={this.state.observation} />
        );
      default:
        return "Unknown stepIndex";
    }
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Observation Submitted!
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div className={classes.stepContentContainer}>
              {this.getStepContent(activeStep)}
              {/*<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>*/}
              <div className={classes.stepperButtonContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CreateObservationStepper.propTypes = {
  classes: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func
};

const mapStateToProps = state => {
  return {
    formData: getFormValues("createObservationForm")(state)
  };
};

export default connect(
  mapStateToProps,
  { setFormData, setError }
)(withStyles(styles)(CreateObservationStepper));
