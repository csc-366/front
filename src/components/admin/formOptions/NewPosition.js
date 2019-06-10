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

class NewPosition extends React.Component {
    state = {
        position: '',
        nationalTagPosition: '',
        description: ''
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {position, nationalTagPosition, description} = this.state;
        if (position && nationalTagPosition && description) {
            this.props.updatePositions({position, nationalTagPosition, description});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.formContainer} noValidate autoComplete={"off"}>
                <TextField
                    id="position"
                    label={"Position"}
                    className={classes.textField}
                    value={this.state.position}
                    onChange={this.handleChange('position')}
                    margin="normal"
                />
                <TextField
                    id="nationalTagPosition"
                    label={"National Tag Position"}
                    className={classes.textField}
                    value={this.state.nationalTagPosition}
                    onChange={this.handleChange('nationalTagPosition')}
                    margin="normal"
                />
                <TextField
                    id="description"
                    label={"Description"}
                    className={classes.textField}
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                />
                <Button color={"primary"} onClick={this.handleSubmit}>Submit</Button>
                <ExistingOptionsList values={this.props.positions} valueText={'Position'} valueKey={'Position'} optionsGroup={'positions'}/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        positions: state.formOptions.positions
    }
};
const updatePositions = updateFormOption('positions');
export default connect(mapStateToProps, {updatePositions})(withStyles(styles)(NewPosition));
