import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import defaultStyles from '../../../defaultStyles';

import {Field} from 'redux-form';

const styles = theme => {
    return {...defaultStyles(theme)}
};

class MeasurementField extends React.Component {
    renderNumberTextField = ({input: {value, onChange}, classes, name, label}) => {
        return (
            <TextField
                id={name}
                label={label}
                type={"number"}
                className={[classes.textField, classes.numberInput].join(' ')}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        )
    };

    render() {
        const {classes, name} = this.props;
        return (
            <div className={classes.formRow}>
                <Field name={`${name}.standardLength`} label={"St. Length"} classes={classes} component={this.renderNumberTextField}/>
                <Field name={`${name}.curvilinearLength`} label={"Crv. Length"} classes={classes} component={this.renderNumberTextField}/>
                <Field name={`${name}.axillaryGirth`} label={"Axillary Girth"} classes={classes} component={this.renderNumberTextField}/>
                <Field name={`${name}.totalMass`} label={"Total Mass"} classes={classes} component={this.renderNumberTextField}/>
                <Field name={`${name}.massTare`} label={"Mass Tare"} classes={classes} component={this.renderNumberTextField}/>
            </div>
        )
    }
}

MeasurementField.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string
};

export default withStyles(styles)(MeasurementField);
