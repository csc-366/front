import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Field} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import defaultStyles from '../../../defaultStyles';

const styles = theme => {
    return {...defaultStyles(theme)}
};

class FieldLeaderField extends React.Component {
    renderFieldLeader({input: {name, value, onChange}, classes}) {
        return (
            <div className={classes.formRow}>
                <TextField
                    id={"fieldLeader"}
                    label={"Field Leader"}
                    className={classes.textField}
                    value={!value ? '' : value}
                    onChange={(event) => onChange(event.target.value)}
                />
            </div>
        )
    }

    render() {
        const {classes, name} = this.props;
        return (
            <Field name={name} component={this.renderFieldLeader} classes={classes}/>
        )
    }
}

FieldLeaderField.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};

export default withStyles(styles)(FieldLeaderField);
