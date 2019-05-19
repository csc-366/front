import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MeasurementField from './MeasurementField';
import Button from '@material-ui/core/Button';
import defaultStyles from "../../../defaultStyles";
import {FieldArray} from 'redux-form';

class MeasurementManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
        };
    }

    renderFields = (count) => ({fields}) => {
        for(let i = 0; i < (count - fields.length); i++) {
            fields.push({
                standardLength: null,
                curvilinearLength: null,
                axillaryGirth: null,
                totalMass: null,
                massTare: null
            })
        }
        for (let i = (fields.length - count); i > 0; i--) {
            fields.remove(fields.length - 1)
        }

        return fields.map((field, index) => {
            return (<MeasurementField key={index} name={field}/>)
        });
    };

    addMeasurement = () => {this.setState({count: this.state.count + 1})};
    removeMeasurement = () => {this.setState({count: (this.state.count === 0) ? 0 : this.state.count - 1})};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formColumn}>
                <FieldArray name={"measurements"} component={this.renderFields(this.state.count)}/>
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
    count: PropTypes.number.isRequired
};

export default withStyles(defaultStyles)(MeasurementManager);
