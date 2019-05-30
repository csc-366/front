import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import defaultStyles from '../../defaultStyles';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import DateField from "./DateField";
import FieldLeaderArray from "./fieldLeaders/FieldLeaderArray";
import MarkManager from "./marks/MarkManager";
import TagManager from './tags/TagManager';
import SelectField from "./SelectField";
import TextField from '@material-ui/core/TextField'
import {Field} from 'redux-form';
import MeasurementManager from "./measurements/MeasurementManager";
import AddImageField from "./AddImageField";

const styles = theme => ({
    ...defaultStyles(theme),
});

class CreateObservationForm extends React.Component {
    componentDidMount() {
        if (!this.props.formOptions.locations) {
            this.props.getLocations();
        }
        if (!this.props.formOptions.positions) {
            this.props.getPositions();
        }
        if(!this.props.formOptions.colors) {
            this.props.getColors();
        }
    }
    ageClassValues = (sex) => {
        let ageClasses = {
            P: "Pup",
            W: "Weanling",
            J: "Juvenile",
            A: "Adult"
        };
        if (sex === 'M') {
            ageClasses.SA1 = "Sub-Adult 1";
            ageClasses.SA2 = "Sub-Adult 2";
            ageClasses.SA3 = "Sub-Adult 3";
            ageClasses.SA4 = "Sub-Adult 4";
        }
        return Object.entries(ageClasses);
    };

    renderTextField = ({input: {onChange, value}, classes, label, name, multiline = false, type = 'text', fullWidth = false}) => {
        return (
            <TextField
                id={name}
                label={label}
                className={classes.textField}
                onChange={event => onChange(event.target.value)}
                type={type}
                value={value}
                multiline={multiline}
                fullWidth={fullWidth}
            />
        )
    };

    render() {
        const {ageClass, sex, classes} = this.props;
        return (
            <form>
                <DateField />
                <SelectField label={"Location"} name={"location"}
                             values={Object.entries(this.props.formOptions.locations)}/>
                <FieldLeaderArray/>
                <Divider style={{marginTop: 8, marginBottom: 8}}/>
                <MarkManager count={0}/>
                <Divider style={{marginTop: 8, marginBottom: 8}}/>
                <TagManager count={0}/>
                <Divider/>
                <SelectField label={"Sex"} name={"sex"} values={Object.entries({M: 'Male', F: 'Female'})}/>
                <SelectField label={"Age Class"} name={"ageClass"}
                             values={this.ageClassValues(sex)}/>
                {(ageClass === 'A' && sex === 'F') ? (
                    <Field name={"pupCount"} component={this.renderTextField} classes={classes} type={'number'}
                           label={"Pup Count"}/>
                ) : null}
                {(ageClass === 'P') ? (
                    <Field name={"pupAge"} component={this.renderTextField} classes={classes} type={'number'}
                           label={"Age (Days)"}/>
                ) : null}

                <Field component={this.renderTextField} name={"moltPercentage"} classes={classes} type={'number'}
                       label={"Molt %"}/>

                <Divider style={{marginTop: 8, marginBottom: 8}}/>

                <MeasurementManager count={0}/>

                <Divider/>

                <Field component={this.renderTextField} name={'comments'} classes={classes} multiline={true}
                       label={"Comments"} fullWidth={true}/>

                <AddImageField/>
            </form>
        )
    }
}

CreateObservationForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    ageClass: PropTypes.string,
    sex: PropTypes.string
};

const form = reduxForm({
    form: 'createObservationForm',
    destroyOnUnmount: false
})(withStyles(styles)(CreateObservationForm));

export default form;
