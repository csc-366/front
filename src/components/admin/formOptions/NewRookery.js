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

class NewRookery extends React.Component {
    state = {
        rookery: '',
        rookeryName: ''
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {rookery, rookeryName} = this.state;
        if (rookery && rookeryName) {
            this.props.updateRookeries({rookery, rookeryName});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.formContainer} noValidate autoComplete={"off"}>
                <TextField
                    id="rookery"
                    label={"Rookery Abbreviation"}
                    className={classes.textField}
                    value={this.state.rookery}
                    onChange={this.handleChange('rookery')}
                    margin="normal"
                />
                <TextField
                    id="rookeryName"
                    label={"Rookery Name"}
                    className={classes.textField}
                    value={this.state.rookeryName}
                    onChange={this.handleChange('rookeryName')}
                    margin="normal"
                />
                <Button color={"primary"} onClick={this.handleSubmit}>Submit</Button>
                <ExistingOptionsList values={this.props.rookeries} valueText={'RookeryName'} valueKey={'Rookery'} optionsGroup={'rookeries'}/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        rookeries: state.formOptions.rookeries
    }
};
const updateRookeries = updateFormOption('rookeries');
export default connect(mapStateToProps, {updateRookeries})(withStyles(styles)(NewRookery));
