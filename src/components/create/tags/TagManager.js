import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TagField from "./TagField";
import Button from "@material-ui/core/Button";
import defaultStyles from "../../../defaultStyles";
import { FieldArray } from "redux-form";
import { connect } from "react-redux";
import { incrementField, decrementField } from "../../../actions/form";

class TagManager extends React.Component {
  addTag = () => {
    this.props.incrementField("tags");
  };
  removeTag = () => {
    this.props.decrementField("tags");
  };

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
      return <TagField key={index} name={`${field}`} />;
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.formColumn}>
        <FieldArray
          name={"tags"}
          component={this.renderFields(this.props.count)}
        />
        <div className={classes.formRow}>
          <Button
            color={"primary"}
            onClick={this.addTag}
            className={classes.button}
          >
            Add Tag
          </Button>
          <Button
            color={"secondary"}
            onClick={this.removeTag}
            className={classes.button}
          >
            Remove Tag
          </Button>
        </div>
      </div>
    );
  }
}

TagManager.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    count: state.formOptions.counts.tags
  };
};

export default connect(
  mapStateToProps,
  { incrementField, decrementField }
)(withStyles(defaultStyles)(TagManager));
