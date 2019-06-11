import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";

const rows = [
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Observation Date"
  },
  {
    id: "fieldLeaders",
    numeric: false,
    disablePadding: false,
    label: "Field Leader(s)"
  },
  { id: "location", numeric: false, disablePadding: false, label: "Location" },
  { id: "sex", numeric: false, disablePadding: false, label: "Sex" },
  { id: "age", numeric: false, disablePadding: false, label: "Age" },
  { id: "marks", numeric: false, disablePadding: false, label: "Marks" },
  { id: "tags", numeric: false, disablePadding: false, label: "Tags" }
];

class ObservationTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

ObservationTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default ObservationTableHead;
