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

class NewColor extends React.Component {
    state = {
        color: '',
        colorName: ''
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = () => {
        const {color, colorName} = this.state;
        if (color && colorName) {
            this.props.updateColors({color, colorName});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.formContainer} noValidate autoComplete={"off"}>
                <TextField
                    id="color"
                    label={"First Letter of Color (i.e., G)"}
                    className={classes.textField}
                    value={this.state.color}
                    onChange={this.handleChange('color')}
                    margin="normal"
                />
                <TextField
                    id="colorName"
                    label={"Full Text Description of Color (i.e., Green)"}
                    className={classes.textField}
                    value={this.state.colorName}
                    onChange={this.handleChange('colorName')}
                    margin="normal"
                />
                <Button color={"primary"} onClick={this.handleSubmit}>Submit</Button>
                <ExistingOptionsList values={this.props.colors} valueText={'ColorName'} valueKey={'Color'} optionsGroup={'colors'}/>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        colors: state.formOptions.colors
    }
};
const updateColors = updateFormOption('colors');
export default connect(mapStateToProps, {updateColors})(withStyles(styles)(NewColor));
