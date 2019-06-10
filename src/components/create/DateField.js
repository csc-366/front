import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../defaultStyles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {Field} from 'redux-form';

const styles = theme => ({
    ...defaultStyles(theme),
});

class DateField extends React.Component {
    renderTextField = ({input: {value, onChange}, label}) => {
        const {classes} = this.props;
        return (
            <TextField
                margin="dense"
                id={"date"}
                label={label}
                type={"date"}
                onChange={(event) => onChange(event.target.value)}
                InputLabelProps={{
                    shrink: true
                }}
                className={classes.textField}
                value={value}
            />
        )
    };

    render() {
        return (
            <Field name={'date'} component={this.renderTextField} label={"Observation Date"}/>
        )
    }
}

DateField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateField);
