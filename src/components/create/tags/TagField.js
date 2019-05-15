import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input';

import defaultStyles from '../../../defaultStyles';

const styles = theme => {
    return {...defaultStyles(theme)}
};

class TagField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.keyId,
            number: '',
            position: '',
            color: '',
            new: '',
            handleTag: props.handleTag
        }
    }

    handleChange = (component) => (event) => {
        let value = (component === 'isNew') ? !this.state.isNew : event.target.value;

        this.setState({[component]: value}, () => {
            const {number, color, position, isNew} = this.state;
            this.state.handleTag(number, color, position, isNew)
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <div key={this.state.key} className={classes.formRow}>
                <TextField
                    id={"tagNumber"}
                    label={"Tag Number"}
                    className={classes.textField}
                    value={this.state.number}
                    onChange={this.handleChange('number')}
                />

                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.textFieldLabel} htmlFor={"tagColorSelector"}>
                        Tag Color
                    </InputLabel>
                    <Select
                        value={this.state.color}
                        className={classes.textField}
                        input={<Input name={"tagColor"} id={"tagColorSelector"}/>}
                        onChange={this.handleChange('color')}
                    >
                        <MenuItem value={"W"}>White</MenuItem>
                        <MenuItem value={"B"}>Blue</MenuItem>
                        <MenuItem value={"G"}>Green</MenuItem>
                        <MenuItem value={"P"}>Pink</MenuItem>
                        <MenuItem value={"V"}>Violet</MenuItem>
                        <MenuItem value={"R"}>Red</MenuItem>
                        <MenuItem value={"Y"}>Yellow</MenuItem>
                        <MenuItem value={"O"}>Orange</MenuItem>
                    </Select>
                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel className={classes.textFieldLabel} htmlFor={"tagPositionSelector"}>
                        Tag Position
                    </InputLabel>
                    <Select
                        value={this.state.position}
                        className={classes.textField}
                        input={<Input name="tagPosition" id="tagPositionSelector"/>}
                        onChange={this.handleChange('position')}
                    >
                        <MenuItem value={"P"}>Left</MenuItem>
                        <MenuItem value={"W"}>Right</MenuItem>
                        <MenuItem value={"J"}>Back</MenuItem>
                    </Select>
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.isNew ? 'checked' : ''}
                            onChange={this.handleChange('isNew')}
                        />
                    }
                    label="New Tag?"
                />
            </div>
        )
    }
}

TagField.propTypes = {
    classes: PropTypes.object.isRequired,
    keyId: PropTypes.number.isRequired,
    handleTag: PropTypes.func.isRequired
};

export default withStyles(styles)(TagField);
