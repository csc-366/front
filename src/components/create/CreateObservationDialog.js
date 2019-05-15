/* eslint-disable no-console */
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
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import {jsDateToMySQLDate} from "../../util/dates";
import defaultStyles from '../../defaultStyles';
import MarkManager from './marks/MarkManager'
import TagManager from './tags/TagManager'
import FieldLeaderManager from "./fieldLeaders/FieldLeaderManager";
import MeasurementManager from './measurements/MeasurementManager';

const styles = theme => {
    return {
        ...defaultStyles(theme),
        root: {
            display: 'flex',
            flexDirection: 'column',
        }
    }
};

class CreateObservationDialog extends React.Component {
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
            location: '',
            tagCount: 1,
            tagPosition: '',
            checked: '',
            marks: [],
            tags: [],
            leaders: []
        }
    }

    handleObjectValues = (type) => (o) => {
        this.setState({[type]: Object.values(o)})
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = (field) => (value) => {
        this.setState({[field]: value.target.value})
    };

    handleTag = (event) => {
        console.log(event.target);
    };

    renderDialog = () => {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.state.open}
                className={classes.dialog}
                onClose={this.handleClose}
                fullWidth
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id={"form-dialog-title"}>Create Observation</DialogTitle>
                {this.renderDialogContent()}
                <DialogActions>
                    <Button onClick={this.handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        )
    };

    renderDialogContent = () => {
        const {classes} = this.props;
        return (
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

                    <FieldLeaderManager count={1} handleLeaders={this.handleObjectValues('fieldLeaders')}/>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={"locationSelector"}
                                    className={classes.textFieldLabel}>Location</InputLabel>
                        <Select
                            value={this.state.location}
                            onChange={this.handleChange('location')}
                            className={classes.textField}
                            input={<Input name={"location"} id={"locationSelector"}/>}
                        >
                            <MenuItem value={"ACL"}>ACL</MenuItem>
                            <MenuItem value={"ACU"}>ACU</MenuItem>
                            <MenuItem value={"ALL"}>ALL</MenuItem>
                            <MenuItem value={"ALLn"}>ALLn</MenuItem>
                            <MenuItem value={"ALLs"}>ALLs</MenuItem>
                            <MenuItem value={"ALU"}>ALU</MenuItem>
                            <MenuItem value={"DCC"}>DCC</MenuItem>
                            <MenuItem value={"DCL"}>DCL</MenuItem>
                            <MenuItem value={"DCU"}>DCU</MenuItem>
                            <MenuItem value={"LTC"}>LTC</MenuItem>
                            <MenuItem value={"LTL"}>LTL</MenuItem>
                            <MenuItem value={"LTU"}>LTU</MenuItem>
                            <MenuItem value={"VAFB"}>VAFB</MenuItem>
                            <MenuItem value={"VP3DC"}>VP3DC</MenuItem>
                            <MenuItem value={"VP3L"}>VP3L</MenuItem>
                            <MenuItem value={"VP3U"}>VP3U</MenuItem>
                        </Select>
                    </FormControl>

                    <Divider style={{marginTop: 8, marginBottom: 8}}/>

                    <MarkManager count={0} handleMarks={this.handleObjectValues('marks')}/>

                    <Divider style={{marginBottom: 8}}/>

                    <TagManager count={0} handleTags={this.handleObjectValues('tags')}/>

                    <Divider/>

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
                            <InputLabel className={classes.textFieldLabel} htmlFor={"ageClassSelector"}>Age
                                Class</InputLabel>
                            <Select
                                value={this.state.ageClass}
                                className={classes.textField}
                                onChange={this.handleChange('ageClass')}
                                input={<Input name="ageClass" id="ageClassSelector" disabled={!this.state.sex}/>}
                            >
                                <MenuItem value={"P"}>Pup</MenuItem>
                                <MenuItem value={"W"}>Weanling</MenuItem>
                                <MenuItem value={"J"}>Juvenile</MenuItem>
                                {this.state.sex === 'M' ? <MenuItem value={"SA1"}>Sub-Adult 1</MenuItem> : null}
                                {this.state.sex === 'M' ? <MenuItem value={"SA2"}>Sub-Adult 2</MenuItem> : null}
                                {this.state.sex === 'M' ? <MenuItem value={"SA3"}>Sub-Adult 3</MenuItem> : null}
                                {this.state.sex === 'M' ? <MenuItem value={"SA4"}>Sub-Adult 4</MenuItem> : null}
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
                        label={"Molt Percentage"}
                        className={classes.textField}
                        onChange={this.handleChange('moltPercentage')}
                        type={"number"}
                    />

                    <Divider style={{marginTop: 8, marginBottom: 8}}/>

                    <MeasurementManager count={0} handleMeasurements={this.handleObjectValues('measurements')} />

                    <Divider/>

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

        );
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
                    <Icon className={classes.buttonIcon}>add</Icon>
                    Create
                </Button>
                {this.renderDialog()}
            </div>
        )
    }
}

CreateObservationDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateObservationDialog);
