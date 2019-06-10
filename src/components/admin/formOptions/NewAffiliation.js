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

class NewAffiliation extends React.Component {
    state = {
        affiliation: '',
        description: ''
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {affiliation, description} = this.state;
        if (affiliation && description) {
            this.props.updateAffiliations({affiliation, description});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.formContainer} noValidate autoComplete={"off"}>
                <TextField
                    id="affiliation"
                    label={"Affiliate Name"}
                    className={classes.textField}
                    value={this.state.affiliation}
                    onChange={this.handleChange('affiliation')}
                    margin="normal"
                />
                <TextField
                    id="description"
                    label={"Affiliation Description"}
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <Button color={"primary"} onClick={this.handleSubmit}>Submit</Button>
                <ExistingOptionsList values={this.props.affiliations} valueText={'Description'} valueKey={'Affiliation'} optionsGroup={'affiliations'}/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        affiliations: state.formOptions.affiliations
    }
};
const updateAffiliations = updateFormOption('affiliations');
export default connect(mapStateToProps, {updateAffiliations})(withStyles(styles)(NewAffiliation));
