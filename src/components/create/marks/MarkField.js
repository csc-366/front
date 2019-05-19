import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import defaultStyles from '../../../defaultStyles';

import {Field, Fields} from 'redux-form';
import SelectField from "../SelectField";

const styles = theme => {
    return {...defaultStyles(theme)}
};

class MarkField extends React.Component {
    renderMarkNumber = ({input: {value, onChange}, classes}) => {
        return (
            <TextField
                id={"markNumber"}
                label={"Mark Number"}
                className={classes.textField}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        );
    };

    renderIsNew = ({input: {onChange, value}}) => {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value ? 'checked' : ''}
                        onChange={() => onChange(!value)}
                    />
                }
                label="New Mark?"
            />
        );
    };

    renderMark = ({classes, name}) => {
        return (
            <div className={classes.formRow}>
                <Field name={`${name}.number`} component={this.renderMarkNumber} classes={classes}/>

                <SelectField name={`${name}.position`} label={'Position'}
                             values={Object.entries({L: 'Left', R: 'Right', B: 'Back'})}/>

                <Field name={`${name}.isNew`} component={this.renderIsNew} classes={classes}/>
            </div>
        );
    };

    render() {
        const {classes, name} = this.props;
        return (
            <Fields names={[
                'number',
                'position',
                'isNew'
            ]} component={this.renderMark} name={name} classes={classes}/>
        )
    }
}

MarkField.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};

export default withStyles(styles)(MarkField);
