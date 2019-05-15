import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MeasurementField from './MeasurementField';
import Button from '@material-ui/core/Button';
import defaultStyles from "../../../defaultStyles";

class MeasurementManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
            measurements: {},
            handleMeasurements: props.handleMeasurements
        };
    }

    handleMeasurement = (measurementKey) => (standardLength, curvilinearLength, axillaryGirth, totalMass, massTare, animalMass) => {
        const measurements = {...this.state.measurements,[measurementKey]: {standardLength,curvilinearLength,axillaryGirth,totalMass,massTare,animalMass}};
        this.setState({measurements}, () => {
            this.state.handleMeasurements(this.state.measurements)
        });
    };

    renderFields = (count) => {
        let fields = [];
        for (let i = 0; i < count; i++) {
            fields.push(<MeasurementField key={i} keyId={i} handleMeasurement={this.handleMeasurement(i)}/>)
        }
        return fields;
    };

    addMeasurement = () => {this.setState({count: this.state.count + 1})};
    removeMeasurement = () => {this.setState({count: (this.state.count === 0) ? 0 : this.state.count - 1})};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formColumn}>
                {this.renderFields(this.state.count)}
                <div className={classes.formRow}>
                    <Button
                        color={"primary"}
                        onClick={this.addMeasurement}
                        className={classes.button}
                    >
                        Add Measurement
                    </Button>
                    <Button
                        color={"secondary"}
                        onClick={this.removeMeasurement}
                        className={classes.button}
                    >
                        Remove Measurement
                    </Button>
                </div>
            </div>
        )
    }
}

MeasurementManager.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    handleMeasurements: PropTypes.func.isRequired
};

export default withStyles(defaultStyles)(MeasurementManager);
