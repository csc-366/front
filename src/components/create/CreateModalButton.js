import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input';
import {jsDateToMySQLDate} from "../../util/dates";

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    formColumn: {
        display: 'inline-flex',
        flexDirection: 'column'
    },
    formRow: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    formControl: {
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing.unit
    },
    textFieldLabel: {
        marginLeft: theme.spacing.unit
    },
    buttonIcon: {
        paddingLeft: -2 * theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    }
});

class CreateModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            date: jsDateToMySQLDate(new Date()),
            sex: '',
            ageClass: '',
            age: '',
            moltPercentage: '',
            comments: '',
            fieldLeaders: {0: ''},
            tagCount: 1,
            tagPosition: '',
            checked: ''
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = (field) => (value) => {
        this.setState({[field]: value.target.value})
    };

    handleFieldLeader = (key) => (event) => {
        let fieldLeaders = {...this.state.fieldLeaders, [key]: event.target.value};
        this.setState({
            fieldLeaders: fieldLeaders
        });
    };

    renderFieldLeaders = () => {
        let fieldLeaders = [];
        for (let i = 0; i < Object.values(this.state.fieldLeaders).length; i++) {
            fieldLeaders.push(
                <TextField
                    key={i}
                    margin="dense"
                    id="fieldLeader"
                    onChange={this.handleFieldLeader(i)}
                    value={this.state.fieldLeaders[i]}
                    label="Field Leader"
                    className={this.props.classes.textField}
                />
            )
        }
        return fieldLeaders
    };

    handleTag = (event) => {
        console.log(event.target);
    };

    renderTags = () => {
        const {classes} = this.props;
        let tags = [];
        for (let i = 0; i < this.state.tagCount; i++) {
            tags.push(
                <div key={i} className={classes.formRow} onChange={this.handleTag}>
                    <TextField
                        key={i}
                        id={"markNumber"}
                        label={"Mark Number"}
                        className={classes.textField}
                    />

                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.textFieldLabel} htmlFor={"tagPositionSelector"}>Tag Position</InputLabel>
                        {/*TODO: OnChange*/}
                        <Select
                            key={i}
                            value={this.state.tagPosition}
                            className={classes.textField}
                            input={<Input name="tagPosition" id="tagPositionSelector"/>}
                        >
                            <MenuItem value={"P"}>Left</MenuItem>
                            <MenuItem value={"W"}>Right</MenuItem>
                            <MenuItem value={"J"}>Back</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleChange('checked')}
                                key={i}
                            />
                        }
                        label="New Mark?"
                    />
                </div>
            )
        }
        return tags;
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    <Icon className={classes.buttonIcon}>add</Icon>
                    Create
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Observation</DialogTitle>
                    <DialogContent>

                        <form className={classes.root}>
                            <TextField
                                margin="dense"
                                id={"date"}
                                label={"Observation Date"}
                                type={"date"}
                                onChange={this.handleChange('date')}
                                defaultValue={jsDateToMySQLDate(new Date())}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                className={classes.textField}
                            />

                            <div className={classes.formColumn}>
                                {this.renderFieldLeaders()}
                            </div>

                            <div className={classes.formColumn}>
                                {this.renderTags()}
                            </div>

                            <div className={classes.formRow}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor={"sexSelector"}
                                                className={classes.textFieldLabel}>Sex</InputLabel>
                                    <Select
                                        value={this.state.sex}
                                        onChange={this.handleChange('sex')}
                                        className={classes.textField}
                                        input={<Input name="sex" id="sexSelector"/>}
                                    >
                                        <MenuItem value={"F"}>F</MenuItem>
                                        <MenuItem value={"M"}>M</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel className={classes.textFieldLabel} htmlFor={"ageClassSelector"}>Age Class</InputLabel>
                                    <Select
                                        value={this.state.ageClass}
                                        className={classes.textField}
                                        onChange={this.handleChange('ageClass')}
                                        input={<Input name="ageClass" id="ageClassSelector"/>}
                                    >
                                        <MenuItem value={"P"}>Pup</MenuItem>
                                        <MenuItem value={"W"}>Weanling</MenuItem>
                                        <MenuItem value={"J"}>Juvenile</MenuItem>
                                        <MenuItem value={"SA1"}>Sub-Adult 1</MenuItem>
                                        <MenuItem value={"SA2"}>Sub-Adult 2</MenuItem>
                                        <MenuItem value={"SA3"}>Sub-Adult 3</MenuItem>
                                        <MenuItem value={"SA4"}>Sub-Adult 4</MenuItem>
                                        <MenuItem value={"A"}>Adult</MenuItem>
                                    </Select>
                                </FormControl>

                                {(this.state.ageClass === 'P') ? (
                                    <TextField
                                        id={"age"}
                                        label={"Age"}
                                        className={classes.textField}
                                        onChange={this.handleChange('age')}
                                        type={"number"}
                                    />
                                ) : null}

                                {(this.state.ageClass === 'A' && this.state.sex === 'F') ? (
                                    <TextField
                                        id={"pupCount"}
                                        label={"Pup Count"}
                                        className={classes.textField}
                                        onChange={this.handleChange('pupCount')}
                                        type={"number"}
                                    />
                                ) : null}
                            </div>

                            <TextField
                                id={"moltPercentage"}
                                label={"Molt %"}
                                className={classes.textField}
                                onChange={this.handleChange('moltPercentage')}
                                type={"number"}
                            />

                            <TextField
                                id={"comments"}
                                label={"Comments"}
                                style={{margin: 8}}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                fullWidth
                                multiline
                                onChange={this.handleChange('comments')}
                            />

                            <input
                                accept={"image/*"}
                                className={classes.input}
                                id={"fileUploadButton"}
                                multiple
                                type={"file"}
                            />
                            <label htmlFor={"fileUploadButton"}>
                                <Button variant={"contained"} component={"span"} className={classes.button}>
                                    Add Images
                                </Button>
                            </label>
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

CreateModalButton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CreateModalButton);
