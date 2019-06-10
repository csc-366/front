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

class NewAgeClass extends React.Component {
    state = {
        shortName: '',
        fullName: '',
        description: ''
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {shortName, fullName} = this.state;
        if (shortName && fullName) {
            this.props.updateAgeClasses({shortName, fullName});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.formContainer} noValidate autoComplete={"off"}>
                <TextField
                    id="shortName"
                    label={"Age Class Abbreviation"}
                    className={classes.textField}
                    value={this.state.shortName}
                    onChange={this.handleChange('shortName')}
                    margin="normal"
                />
                <TextField
                    id="fullName"
                    label={"Full Age Class Name"}
                    className={classes.textField}
                    value={this.state.fullName}
                    onChange={this.handleChange('fullName')}
                    margin="normal"
                />
                <TextField
                    id="description"
                    label={"Age Class Description (Optional)"}
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <Button color={"primary"} onClick={this.handleSubmit}>Submit</Button>
                <ExistingOptionsList values={this.props.ageClasses} valueText={'FullName'} valueKey={'ShortName'} optionsGroup={'ageClasses'}/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        ageClasses: state.formOptions.ageClasses
    }
};
const updateAgeClasses = updateFormOption('ageClasses');
export default connect(mapStateToProps, {updateAgeClasses})(withStyles(styles)(NewAgeClass));
