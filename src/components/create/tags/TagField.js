import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'

import {Field, Fields} from 'redux-form';

import defaultStyles from '../../../defaultStyles';
import SelectField from "../SelectField";
import {connect} from 'react-redux';

const styles = theme => {
    return {...defaultStyles(theme)}
};

class TagField extends React.Component {
    renderTagNumber = ({input: {value, onChange}, classes}) => {
        return (
            <TextField
                id={"tagNumber"}
                label={"Tag Number"}
                className={classes.textField}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        )
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
                label="New Tag?"
            />
        );
    };

    renderTag = ({classes, name}) => {
        return (
            <div className={classes.formRow}>
                <Field name={`${name}.number`} component={this.renderTagNumber} classes={classes}/>

                <SelectField name={`${name}.color`} label={"Color"}
                             values={Object.entries(this.props.colors.reduce((agg, color) => ({...agg, [color.Color]: color.ColorName}),{}))}/>

                <SelectField name={`${name}.position`} label={"Position"}
                             values={Object.entries(this.props.positions.reduce((agg, position) => ({...agg, [position.Position]: position.Position}), {}))}/>

                <Field name={`${name}.isNew`} component={this.renderIsNew} classes={classes}/>
            </div>
        )
    }

    render() {
        const {classes, name} = this.props;
        return (<Fields names={['number', 'color', 'position', 'isNew']}
                        component={this.renderTag} name={name} classes={classes}/>)
    }
}

TagField.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        positions: state.formOptions.positions,
        colors: state.formOptions.colors
    }
};

export default connect(mapStateToProps)(withStyles(styles)(TagField));
