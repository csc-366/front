import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import defaultStyles from '../../../defaultStyles';

const styles = theme => {return {...defaultStyles(theme)}};

class MeasurementField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.keyId,
            standardLength: '',
            curvilinearLength: '',
            axillaryGirth: '',
            totalMass: '',
            massTare: '',
            animalMass: '',
            handleMeasurement: props.handleMeasurement
        }
    }

    handleChange = (component) => (event) => {
        const {totalMass, massTare} = this.state;
        this.setState({[component]: event.target.value, animalMass: totalMass - massTare}, () => {
            this.setState({animalMass: totalMass - massTare}, () => {
                const {standardLength, curvilinearLength, axillaryGirth, totalMass, massTare, animalMass} = this.state;
                this.state.handleMeasurement(standardLength, curvilinearLength, axillaryGirth, totalMass, massTare, animalMass)
            });
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div key={this.state.key} className={classes.formRow}>
                <TextField
                    id={"standardLength"}
                    label={"St. Length"}
                    type={"number"}
                    className={[classes.textField, classes.numberInput].join(' ')}
                    value={this.state.standardLength}
                    onChange={this.handleChange('standardLength')}
                />

                <TextField
                    id={"curvilinearLength"}
                    label={"Crv. Length"}
                    type={"number"}
                    className={classes.textField}
                    value={this.state.curvilinearLength}
                    onChange={this.handleChange('curvilinearLength')}
                />

                <TextField
                    id={"axillaryGirth"}
                    label={"Axillary Girth"}
                    type={"number"}
                    className={classes.textField}
                    value={this.state.axillaryGirth}
                    onChange={this.handleChange('axillaryGirth')}
                />

                <TextField
                    id={"totalMass"}
                    label={"Total Mass"}
                    type={"number"}
                    className={classes.textField}
                    value={this.state.totalMass}
                    onChange={this.handleChange('totalMass')}
                />

                <TextField
                    id={"massTare"}
                    label={"Tare"}
                    type={"number"}
                    className={classes.textField}
                    value={this.state.massTare}
                    onChange={this.handleChange('massTare')}
                />

                <Typography>{this.state.animalMass}</Typography>
            </div>
        )
    }
}

MeasurementField.propTypes = {
    classes: PropTypes.object.isRequired,
    keyId: PropTypes.number.isRequired,
    handleMeasurement: PropTypes.func.isRequired
};

export default withStyles(styles)(MeasurementField);
