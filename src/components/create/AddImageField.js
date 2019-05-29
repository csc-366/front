import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from '../../defaultStyles';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Field} from 'redux-form';

const styles = theme => ({
    ...defaultStyles(theme)
});

class AddImageField extends React.Component {

    renderImageField = ({input: {onChange, value}, classes, label, name}) => {
        return (
            <Button component="label" variant={"contained"} className={classes.button}>
                {label}
                <input accept={"image/*"}
                       className={classes.input}
                       id={name}
                       multiple
                       type={"file"}
                       onChange={e => onChange(e.target.files[0])}
                       value={value}
                />
            </Button>
        )
    };

    render() {
        const {classes} = this.props;
        return (
            <Field component={this.renderImageField} name={"images"} classes={classes} label={"Add Images"}/>
        )
    }
}

AddImageField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddImageField);