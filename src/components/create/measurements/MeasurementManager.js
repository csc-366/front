import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MeasurementField from "./MeasurementField";
import Button from "@material-ui/core/Button";
import defaultStyles from "../../../defaultStyles";
import { FieldArray } from "redux-form";
import { connect } from "react-redux";
import { incrementField, decrementField } from "../../../actions/form";

class MeasurementManager extends React.Component {
  renderFields = count => ({ fields }) => {
    for (let i = 0; i < count - fields.length; i++) {
      fields.push({
        standardLength: null,
        curvilinearLength: null,
        axillaryGirth: null,
        totalMass: null,
        massTare: null
      });
    }
    for (let i = fields.length - count; i > 0; i--) {
      fields.remove(fields.length - 1);
    }

    return fields.map((field, index) => {
      return <MeasurementField key={index} name={field} />;
    });
  };

  addMeasurement = () => {
    this.props.incrementField("measurements");
  };
  removeMeasurement = () => {
    this.props.decrementField("measurements");
  };

  renderAddRemoveMeasurement = () => {
    const { classes, count } = this.props;
    if (count >= 1) {
      return (
        <Button
          color={"secondary"}
          onClick={this.removeMeasurement}
          className={classes.button}
        >
          Remove Measurement
        </Button>
      );
    } else {
      return (
        <Button
          color={"primary"}
          onClick={this.addMeasurement}
          className={classes.button}
        >
          Add Measurement
        </Button>
      );
    }
  };

  render() {
    const { classes, count } = this.props;
    return (
      <div className={classes.formColumn}>
        <FieldArray
          name={"measurements"}
          component={this.renderFields(count)}
        />
        <div className={classes.formRow}>
          {this.renderAddRemoveMeasurement()}
        </div>
      </div>
    );
  }
}

MeasurementManager.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    count: state.formOptions.counts.measurements
  };
};

export default connect(
  mapStateToProps,
  { incrementField, decrementField }
)(withStyles(defaultStyles)(MeasurementManager));
