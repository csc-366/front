import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import defaultStyles from "../../../defaultStyles";
import { stableSort, getSorting } from "./util";
import SealTableHead from "./SealTableHead";
import SealTableToolbar from "./SealTableToolbar";
import { connect } from "react-redux";
import { getPendingObservations } from "../../../actions/pendingObservation";
import SealDetailsModal from "../../details/SealDetailsModal";
import { backend } from "../../../apis/backend";

const styles = theme => ({
  ...defaultStyles(theme),
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class SealTable extends React.Component {
  state = {
    seals: [],
    sealId: -1,
    order: "asc",
    orderBy: "calories",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    openDetails: false,
    ObservationId: -1,
    pageDidChange: false,
    countDidChange: false,
    filterSeals: true,
    filter: {
      name: "",
      markIndex: 0,
      marks: {},
      tagIndex: 0,
      tags: {},
      sex: "",
      dateStart: "",
      dateEnd: "",
      location: "",
      recorder: "",
      fieldLeaderIndex: 0,
      fieldLeaders: {},
      ageClass: "",
      ageDays: "",
      pupCount: "",
      molt: ""
    }
  };

  async componentDidMount() {
    await this.getAllSeals();
  }

  getAllSeals = async () => {
    const results = (await backend.get("/seals?count=999&page=1")).data;
    this.setState({ seals: results.data });
  };

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    this.setState({ sealId: id, openDetails: true });
  };

  handleChangePage = (event, page) => {
    this.setState({ page, openDetails: false, pageDidChange: true });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
      openDetails: false,
      countDidChange: true
    });
  };

  setFilter = (filterSeals, filter) => {
    this.setState({
      filterSeals: filterSeals,
      filter: filter
    });
  };

  // applyFilter = observation => {
  //   const { filter } = this.state;
  //
  //   const filters = Object.entries(filter);
  //   for (let i = 0; i < filters.length; i++) {
  //     let [filterName, filterValue] = filters[i];
  //     switch (filterName) {
  //       case "name":
  //         if (filterValue && filterValue !== observation.Name) {
  //           return false;
  //         }
  //         break;
  //       case "marks":
  //         if (!this.marksAreEqual(filterValue, observation.marks)) {
  //           return false;
  //         }
  //         break;
  //       case "tags":
  //         if (!this.tagsAreEqual(filterValue, observation.tags)) {
  //           return false;
  //         }
  //         break;
  //       case "sex":
  //         if (
  //           observation.Sex &&
  //           filterValue &&
  //           filterValue !== observation.Sex
  //         ) {
  //           return false;
  //         }
  //         break;
  //       case "dateStart":
  //         {
  //           const filterDate = new Date(filterValue);
  //           const observationDate = new Date(observation.Date);
  //
  //           if (observationDate < filterDate) {
  //             return false;
  //           }
  //         }
  //         break;
  //       case "dateEnd":
  //         {
  //           const filterDate = new Date(filterValue);
  //           const observationDate = new Date(observation.Date);
  //
  //           if (observationDate > filterDate) {
  //             return false;
  //           }
  //         }
  //         break;
  //       case "location":
  //         if (
  //           observation.Location &&
  //           filterValue &&
  //           filterValue !== observation.Location
  //         ) {
  //           return false;
  //         }
  //         break;
  //       case "recorder":
  //         if (
  //           observation.Recorder &&
  //           filterValue &&
  //           filterValue !== observation.Recorder
  //         ) {
  //           return false;
  //         }
  //         break;
  //       case "fieldLeaders":
  //         if (_.difference(filterValue, observation.FieldLeaders).length > 0) {
  //           return false;
  //         }
  //         break;
  //       case "ageClass":
  //         if (
  //           observation.Age &&
  //           filterValue &&
  //           isNaN(observation.Age) &&
  //           filterValue !== observation.Age
  //         ) {
  //           return false;
  //         }
  //         break;
  //       case "ageDays":
  //         if (
  //           !isNaN(observation.Age) &&
  //           filterValue !== Number.parseInt(observation.Age)
  //         ) {
  //           return false;
  //         }
  //         break;
  //       case "pupCount":
  //         if (
  //           observation.PupCount &&
  //           filterValue &&
  //           filterValue !== observation.PupCount
  //         ) {
  //           return false;
  //         }
  //         break;
  //       case "molt":
  //         if (
  //           observation.MoltPercentage &&
  //           Number.parseInt(filterValue) > observation.MoltPercentage
  //         ) {
  //           return false;
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   return true;
  // };

  renderSeals = () => {
    const { classes } = this.props;
    const { order, orderBy, rowsPerPage, page, seals } = this.state;

    if (!seals) {
      return null;
    }
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, seals.length - page * rowsPerPage);

    return (
      <TableBody className={classes.tableBody}>
        {stableSort(seals, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(n => {
            return (
              <TableRow
                hover
                onClick={event => this.handleClick(event, n.FirstObservation)}
                tabIndex={-1}
                key={n.FirstObservation}
              >
                <TableCell align="left">
                  {!n.Name ? "(No Name Assigned)" : n.name}
                </TableCell>
                <TableCell align="left">{n.FirstObservation}</TableCell>
                <TableCell align="left">{!n.Sex ? "Unknown" : n.Sex}</TableCell>
                <TableCell align="left">
                  {!n.Procedure ? "N/A" : n.Procedure}
                </TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  };

  handleModalClose = () => {
    this.setState({ openDetails: false });
  };

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    return (
      <>
        <Paper className={classes.root}>
          <SealTableToolbar
            numSelected={selected.length}
            filterSeals={this.state.filterSeals}
            filter={this.state.filter}
            setFilter={this.setFilter}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <SealTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
              {this.renderSeals()}
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 25, 50, 250, 1000, 2000]}
            component="div"
            count={this.state.seals.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <SealDetailsModal
          open={this.state.openDetails}
          handleClose={this.handleModalClose}
          sealId={this.state.sealId}
          ObservationId={this.state.ObservationId}
        />
      </>
    );
  }
}

SealTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    pendingObservations: state.observations.pending
  };
};

export default connect(
  mapStateToProps,
  { getPendingObservations }
)(withStyles(styles)(SealTable));
