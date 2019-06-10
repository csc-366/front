import React from 'react';
import {connect} from 'react-redux';
import {updateFormOption} from "../../../actions/formOptions";
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from "../../../defaultStyles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExistingOptionsList from "./ExistingOptionsList";

const styles = theme => ({
    ...defaultStyles(theme),
    textField: {
        width: '100%',
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
});

class NewLocation extends React.Component {
    state = {
        beach: '',
        beachName: '',
        rookery: ''
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {beach, beachName, rookery} = this.state;
        if (beach && beachName && rookery) {
            this.props.updateLocations({beach, beachName, rookery});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.formContainer} noValidate autoComplete={"off"}>
                <TextField
                    id="beach"
                    label={"Beach"}
                    className={classes.textField}
                    value={this.state.beach}
                    onChange={this.handleChange('beach')}
                    margin="normal"
                />
                <TextField
                    id="beachName"
                    label={"Beach Name"}
                    className={classes.textField}
                    value={this.state.beachName}
                    onChange={this.handleChange('beachName')}
                    margin="normal"
                />
                <TextField
                    id="rookery"
                    label={"Rookery"}
                    className={classes.textField}
                    value={this.state.rookery}
                    onChange={this.handleChange('rookery')}
                    margin="normal"
                />
                <Button color={"primary"} onClick={this.handleSubmit}>Submit</Button>
                <ExistingOptionsList values={this.props.locations} valueText={'BeachName'} valueKey={'Beach'} optionsGroup={'locations'}/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        locations: state.formOptions.locations
    }
};
const updateLocations = updateFormOption('locations');
export default connect(mapStateToProps, {updateLocations})(withStyles(styles)(NewLocation));
