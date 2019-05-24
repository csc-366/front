import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import defaultStyles from '../../defaultStyles';
import {reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DateField from "./DateField";
import FieldLeaderArray from "./fieldLeaders/FieldLeaderArray";
import MarkManager from "./marks/MarkManager";
import TagManager from './tags/TagManager';
import SelectField from "./SelectField";
import TextField from '@material-ui/core/TextField'
import {Field} from 'redux-form';
import MeasurementManager from "./measurements/MeasurementManager";
import Button from '@material-ui/core/Button'
import {setObservationDate, setFormData} from "../../actions/createObservation";

const styles = theme => ({
    ...defaultStyles(theme),
});

class CreateObservationForm extends React.Component {
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

    renderTextField = ({input: {onChange, value}, classes, label, name, multiline = false, type = 'text', fullWidth=false}) => {
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

    renderImageField = ({input: {onChange, value}, classes, label, name}) => {
        return (
            <>
                <input accept={"image/*"}
                       className={classes.input}
                       id={name}
                       multiple
                       type={"file"}
                       onChange={e => onChange(e.target.files)}
                       value={value}
                />
                <label htmlFor={name}>
                    <Button variant={"contained"} component={"span"} className={classes.button}>
                        {label}
                    </Button>
                </label>
            </>
        )
    };

    render() {
        const {ageClass, sex, classes} = this.props;
        return (
            <form>
                <DateField/>
                <SelectField label={"Location"} name={"location"}
                             values={Object.entries({
                                 ACL: "ACL",
                                 ACU: "ACU",
                                 ALL: "ALL",
                                 ALLn: "ALLn",
                                 ALLs: "ALLs",
                                 ALU: "ALU",
                                 DCC: "DCC",
                                 DCL: "DCL",
                                 DCU: "DCU",
                                 LTC: "LTC",
                                 LTL: "LTL",
                                 LTU: "LTU",
                                 VAFB: "VAFB",
                                 VP3DC: "VP3DC",
                                 VP3L: "VP3L",
                                 VP3U: "VP3U"
                             })}/>
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

                <Field component={this.renderImageField} name={"images"} classes={classes} label={"Add Images"}/>
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
    form: 'createObservationForm'
})(withStyles(styles)(CreateObservationForm));

const selector = formValueSelector('createObservationForm');

const mapStateToProps = state => {
    const ageClass = selector(state, 'ageClass');
    const sex = selector(state, 'sex');

    return {
        ageClass,
        sex,
        observationData: state.observationData,
        formData: state.form.observationData
    }
};

export default connect(mapStateToProps, {setObservationDate, setFormData})(form);
