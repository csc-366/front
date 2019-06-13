import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FieldArray } from "redux-form";
import MarkField from "./MarkField";
import defaultStyles from "../../../defaultStyles";
import { connect } from "react-redux";
import { decrementField, incrementField } from "../../../actions/form";

class MarkManager extends React.Component {
  renderFields = count => ({ fields }) => {
    for (let i = 0; i < count - fields.length; i++) {
      fields.push({
        number: "",
        position: "",
        isNew: false
      });
    }
    for (let i = fields.length - count; i > 0; i--) {
      fields.remove(fields.length - 1);
    }

    return fields.map((field, index) => {
      return <MarkField key={index} name={field} />;
    });
  };

  addMark = () => {
    this.props.incrementField("marks");
  };

  removeMark = () => {
    this.props.decrementField("marks");
  };

  render() {
    const { classes, count } = this.props;
    return (
      <div className={classes.formColumn}>
        <FieldArray name={"marks"} component={this.renderFields(count)} />
        <div className={classes.formRow}>
          <Button
            color={"primary"}
            onClick={this.addMark}
            className={classes.button}
          >
            Add Mark
          </Button>
          <Button
            color={"secondary"}
            onClick={this.removeMark}
            className={classes.button}
          >
            Remove Mark
          </Button>
        </div>
      </div>
    );
  }
}

MarkManager.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    count: state.formOptions.counts.marks
  };
};

export default connect(
  mapStateToProps,
  { decrementField, incrementField }
)(withStyles(defaultStyles)(MarkManager));
