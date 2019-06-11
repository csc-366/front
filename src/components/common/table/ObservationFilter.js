import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SealFilterFieldLeader from "./SealFilterFieldLeader";
import Button from "@material-ui/core/Button";
import {connect} from 'react-redux';

const styles = theme => ({
    header: {
        marginLeft: theme.spacing.unit
    },
    textField: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        minWidth: 180,
        maxWidth: 180
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        minWidth: 180,
        maxWidth: 180
    },
    button: {
        marginLeft: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class SealFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    mapMenuItems = (items) => {
        const entries = Object.entries(items);
        return entries.map(([value, text], index) => {
            return <MenuItem key={index} value={value}>{text}</MenuItem>
        })
    };

    render() {
        const {classes, filter, handleChange} = this.props;

        let fieldLeaderComponents = [];
        const fieldLeaderList = Object.keys(filter.fieldLeaders);

        for (let i = 0; i < fieldLeaderList.length; i++) {
            fieldLeaderComponents.push(
                <SealFilterFieldLeader
                    key={fieldLeaderList[i]}
                    numFieldLeader={i + 1}
                    fieldLeader={filter.fieldLeaders[fieldLeaderList[i]]}
                    removeFieldLeader={() => {
                        this.props.removeItem("fieldLeaders")(fieldLeaderList[i]);
                    }}
                    handleChange={this.props.editItem("fieldLeaders")(fieldLeaderList[i])}
                />
            );
        }
        const {formOptions} = this.props;
        return (
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemText>
                        <Typography className={classes.header} variant="subtitle2">
                            Observation Details
                        </Typography>
                        <TextField
                            label="Date Start"
                            type="date"
                            className={classes.textField}
                            onChange={handleChange("dateStart")}
                            value={filter.dateStart}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            label="Date End"
                            type="date"
                            className={classes.textField}
                            onChange={handleChange("dateEnd")}
                            value={filter.dateEnd}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <FormControl className={classes.formControl}>
                            <Select
                                value={filter.location}
                                onChange={handleChange("location")}
                                input={<OutlinedInput labelWidth={0}/>}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <i>Select Location</i>
                                </MenuItem>
                                {this.mapMenuItems(Object.values(formOptions.locations).reduce((agg, location) => {
                                    return {
                                        ...agg,
                                        [location.Beach]: location.BeachName
                                    };
                                }, {}))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Recorder"
                            className={classes.textField}
                            value={filter.recorder}
                            onChange={handleChange("recorder")}
                            variant="outlined"
                        />
                    </ListItemText>
                </ListItem>
                {fieldLeaderComponents}
                <Button
                    className={classes.button}
                    variant="outlined"
                    color={"secondary"}
                    onClick={this.props.addFieldLeader}
                >
                    Add Field Leader
                </Button>
                <Divider/>
                <ListItem>
                    <ListItemText>
                        <Typography className={classes.header} variant="subtitle2">
                            Sex
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={filter.sex}
                                onChange={handleChange("sex")}
                                input={<OutlinedInput labelWidth={0}/>}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <i>Select Sex</i>
                                </MenuItem>
                                <MenuItem value={"M"}>Male</MenuItem>
                                <MenuItem value={"F"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText>
                        <Typography className={classes.header} variant="subtitle2">
                            Age
                        </Typography>
                        <FormControl className={classes.formControl}>
                            {filter.sex === "male" ? (
                                <React.Fragment>
                                    <Select
                                        value={filter.ageClass}
                                        onChange={handleChange("ageClass")}
                                        input={<OutlinedInput labelWidth={0}/>}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <i>Select Age Class</i>
                                        </MenuItem>
                                        {this.mapMenuItems(Object.values(formOptions.ageClasses).reduce((agg, ageClass) => {
                                            return {
                                                ...agg,
                                                [ageClass.ShortName]: ageClass.FullName
                                            }
                                        }, {}))}
                                    </Select>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Select
                                        value={filter.ageClass}
                                        onChange={handleChange("ageClass")}
                                        input={<OutlinedInput labelWidth={0}/>}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <i>Select Age Class</i>
                                        </MenuItem>
                                        {this.mapMenuItems(Object.values(formOptions.ageClasses).reduce((agg, ageClass) => {
                                            if (/SA./.test(ageClass)) {
                                                return agg;
                                            }
                                            return {
                                                ...agg,
                                                [ageClass.ShortName]: ageClass.FullName
                                            }
                                        }, {}))}
                                    </Select>
                                </React.Fragment>
                            )}
                        </FormControl>
                        {filter.ageClass === "P" ? (
                            <TextField
                                label="Age in Days"
                                className={classes.textField}
                                value={filter.ageDays}
                                onChange={handleChange("ageDays")}
                                type="number"
                                variant="outlined"
                            />
                        ) : null}
                        {filter.sex === "female" && filter.ageClass === "A" ? (
                            <TextField
                                label="Pup Count"
                                className={classes.textField}
                                value={filter.pupCount}
                                onChange={handleChange("pupCount")}
                                type="number"
                                variant="outlined"
                            />
                        ) : null}
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText>
                        <Typography className={classes.header} variant="subtitle2">
                            Last Observed Molt %
                        </Typography>
                        <TextField
                            label="Start %"
                            onChange={handleChange("moltStart")}
                            type="number"
                            className={classes.textField}
                            value={filter.moltStart}
                            variant="outlined"
                        />
                        <TextField
                            label="End %"
                            onChange={handleChange("moltEnd")}
                            type="number"
                            className={classes.textField}
                            value={filter.moltEnd}
                            variant="outlined"
                        />
                    </ListItemText>
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        formOptions: state.formOptions
    }
};

export default connect(mapStateToProps)(withStyles(styles)(SealFilter));
