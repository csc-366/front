import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input';
import defaultStyles from '../../../defaultStyles';

const styles = theme => {return {...defaultStyles(theme)}};

class MarkField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.keyId,
            number: '',
            position: '',
            isNew: '',
            handleMark: props.handleMark
        }
    }

    handleChange = (component) => (event) => {
        let value;
        if(component === 'isNew') {
            value = !this.state.isNew;
        } else {
            value = event.target.value
        }

        this.setState({[component]: value}, () => {
            const {number, position, isNew} = this.state;
            this.state.handleMark(number, position, isNew)
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div key={this.state.key} className={classes.formRow}>
                <TextField
                    id={"markNumber"}
                    label={"Mark Number"}
                    className={classes.textField}
                    value={this.state.number}
                    onChange={this.handleChange('number')}
                />

                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.textFieldLabel} htmlFor={"markPositionSelector"}>
                        Mark Position
                    </InputLabel>
                    <Select
                        value={this.state.position}
                        className={classes.textField}
                        input={<Input name="markPosition" id="markPositionSelector"/>}
                        onChange={this.handleChange('position')}
                    >
                        <MenuItem value={"L"}>Left</MenuItem>
                        <MenuItem value={"R"}>Right</MenuItem>
                        <MenuItem value={"B"}>Back</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.isNew ? 'checked':''}
                            onChange={this.handleChange('isNew')}
                        />
                    }
                    label="New Mark?"
                />
            </div>
        )
    }
}

MarkField.propTypes = {
    classes: PropTypes.object.isRequired,
    keyId: PropTypes.number.isRequired,
    handleMark: PropTypes.func.isRequired
};

export default withStyles(styles)(MarkField);
