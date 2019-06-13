import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import defaultStyles from "../../../defaultStyles";

const mapColor = colorAbbrev => {
  switch (colorAbbrev) {
    case "W":
      return "#DDD";
    case "B":
      return "blue";
    case "G":
      return "green";
    case "P":
      return "pink";
    case "V":
      return "violet";
    case "R":
      return "red";
    case "Y":
      return "yellow";
    case "O":
      return "orange";
    default:
      return "black";
  }
};

const TagChip = ({ number, position, color }) => {
  const backgroundColor = mapColor(color);
  const textColor = ["W", "P", "V", "R", "Y", "O"].includes(color)
    ? "#333"
    : "#DDD";
  return (
    <Chip
      label={`${number ? number : "?"}@${position ? position : "?"}`}
      style={{ backgroundColor: backgroundColor, color: textColor }}
    />
  );
};

TagChip.propTypes = {
  number: PropTypes.string,
  position: PropTypes.string,
  color: PropTypes.string
};

export default withStyles(defaultStyles)(TagChip);
