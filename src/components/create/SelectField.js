import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../defaultStyles';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import {Field} from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    ...defaultStyles(theme),
});

class SelectField extends React.Component {
    renderMenuItem = (value, text, key) => {
        return (<MenuItem key={key} value={value}>{text}</MenuItem>)
    };

    renderSelector = ({input: {value, onChange}, label, classes, values}) => {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={"selector"} className={classes.textFieldLabel}>{label}</InputLabel>
                <Select
                    onChange={(event, value) => onChange(value.props.value)}
                    className={classes.textField}
                    input={<Input id={"selector"}/>}
                    value={value}
                >
                    <MenuItem value={""}/>
                    {values.map(([value, text], index) => this.renderMenuItem(value, text, index))}
                </Select>
            </FormControl>
        )
    };

    render() {
        const {name, label, classes, values} = this.props;
        return (
            <Field name={name} component={this.renderSelector} label={label} classes={classes} values={values}/>
        )
    }

}

SelectField.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectField);
