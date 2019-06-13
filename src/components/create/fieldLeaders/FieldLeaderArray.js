import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FieldLeaderField from "./FieldLeaderField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import defaultStyles from "../../../defaultStyles";
import { FieldArray } from "redux-form";
import { connect } from "react-redux";
import { incrementField, decrementField } from "../../../actions/form";

class FieldLeaderArray extends React.Component {
  addFieldLeader = () => {
    this.props.incrementField("fieldLeaders");
  };
  removeFieldLeader = () => {
    this.props.decrementField("fieldLeaders");
  };

  renderFields = count => ({ fields }) => {
    for (let i = 0; i < count - fields.length; i++) {
      fields.push("");
    }
    for (let i = fields.length - count; i > 0; i--) {
      fields.remove(fields.length - 1);
    }

    return fields.map((field, index) => {
      return <FieldLeaderField key={index} name={field} />;
    });
  };

  render() {
    const { classes, count } = this.props;
    return (
      <div className={classes.formRow}>
        <FieldArray
          name={"fieldLeaders"}
          component={this.renderFields(count)}
        />
        <div className={classes.formRow}>
          <Button
            color={"primary"}
            onClick={this.addFieldLeader}
            className={classes.button}
          >
            <Icon>add</Icon>
          </Button>
          <Button
            color={"secondary"}
            onClick={this.removeFieldLeader}
            className={classes.button}
          >
            <Icon>remove</Icon>
          </Button>
        </div>
      </div>
    );
  }
}

FieldLeaderArray.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    count: state.formOptions.counts.fieldLeaders
  };
};

export default connect(
  mapStateToProps,
  { incrementField, decrementField }
)(withStyles(defaultStyles)(FieldLeaderArray));
