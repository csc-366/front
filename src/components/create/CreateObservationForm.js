import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import defaultStyles from "../../defaultStyles";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import DateField from "./DateField";
import FieldLeaderArray from "./fieldLeaders/FieldLeaderArray";
import MarkManager from "./marks/MarkManager";
import TagManager from "./tags/TagManager";
import SelectField from "./SelectField";
import TextField from "@material-ui/core/TextField";
import { Field } from "redux-form";
import MeasurementManager from "./measurements/MeasurementManager";
import { connect } from "react-redux";

const styles = theme => ({
  ...defaultStyles(theme)
});

class CreateObservationForm extends React.Component {
  ageClassValues = sex => {
    let classes = this.props.formOptions.ageClasses;
    if (sex === "F") {
      classes = classes.filter(
        ageClass => !ageClass.FullName.includes("SubAdult")
      );
    }
    return classes.map(ageClass => [ageClass.ShortName, ageClass.FullName]);
  };

  renderTextField = ({
    input: { onChange, value },
    classes,
    label,
    name,
    multiline = false,
    type = "text",
    fullWidth = false
  }) => {
    return (
      <TextField
        id={name}
        label={label}
        className={classes.textField}
        onChange={event => onChange(event.target.value)}
        type={type}
        value={value}
        multiline={multiline}
        fullWidth={fullWidth}
      />
    );
  };

  render() {
    const { ageClass, sex, classes } = this.props;
    return (
      <form>
        <DateField />
        <SelectField
          label={"Location"}
          name={"location"}
          values={this.props.formOptions.locations.map(location => [
            location.Beach,
            location.BeachName
          ])}
        />
        <FieldLeaderArray />
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
        <MarkManager />
        <Divider style={{ marginTop: 8, marginBottom: 8 }} />
        <TagManager />
        <Divider />
        <SelectField
          label={"Sex"}
          name={"sex"}
          values={Object.entries({ M: "Male", F: "Female" })}
        />
        <SelectField
          label={"Age Class"}
          name={"ageClass"}
          values={this.ageClassValues(sex)}
        />
        {ageClass === "A" && sex === "F" ? (
          <Field
            name={"pupCount"}
            component={this.renderTextField}
            classes={classes}
            type={"number"}
            label={"Pup Count"}
          />
        ) : null}
        {ageClass === "P" ? (
          <Field
            name={"pupAge"}
            component={this.renderTextField}
            classes={classes}
            type={"number"}
            label={"Age (Days)"}
          />
        ) : null}

        <Field
          component={this.renderTextField}
          name={"moltPercentage"}
          classes={classes}
          type={"number"}
          label={"Molt %"}
        />

        <Divider style={{ marginTop: 8, marginBottom: 8 }} />

        <MeasurementManager />

        <Divider />

        <Field
          component={this.renderTextField}
          name={"comments"}
          classes={classes}
          multiline={true}
          label={"Comments"}
          fullWidth={true}
        />
      </form>
    );
  }
}

CreateObservationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  ageClass: PropTypes.string,
  sex: PropTypes.string
};

const form = reduxForm({
  form: "createObservationForm",
  destroyOnUnmount: false
})(withStyles(styles)(CreateObservationForm));

const mapStateToProps = state => {
  return {
    formOptions: state.formOptions
  };
};

export default connect(mapStateToProps)(form);
