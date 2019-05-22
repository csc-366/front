import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateObservationForm from './CreateObservationForm';
import {setFormData} from "../../actions/createObservation";
import {connect} from 'react-redux';
import {getFormValues} from 'redux-form';

const styles = theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    stepperButtonContainer: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

function getSteps() {
    return ['Enter', 'Validate', 'Confirm'];
}


class CreateObservationStepper extends React.Component {
    state = {
        activeStep: 0
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    componentDidUpdate() {
        const {setFormData, formData} = this.props;
        setFormData(formData)
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return (
                    <CreateObservationForm />
                );
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
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
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
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
                                <Button variant="contained" color="primary" onClick={this.handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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
        formData: getFormValues('createObservationForm')(state)
    }
};

export default connect(mapStateToProps, {setFormData})(withStyles(styles)(CreateObservationStepper));
