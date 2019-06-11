import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import defaultStyles from '../../../defaultStyles';
import {stableSort, getSorting} from './util';
import ObservationTableHead from './ObservationTableHead';
import ObservationTableToolbar from './ObservationTableToolbar';
import MarkChip from "./MarkChip";
import TagChip from "./TagChip";
import {connect} from 'react-redux';
import {getPendingObservations} from "../../../actions/pendingObservation";
import PendingObservationDetailsModal from "../../details/PendingObservationDetailsModal";
import * as _ from 'lodash';

const styles = theme => ({
    ...defaultStyles(theme),
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class ObservationTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
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
            molt: "",
        }
    };

    componentDidMount() {
        this.props.getPendingObservations();
    }

    // noinspection JSCheckFunctionSignatures
    componentDidUpdate() {
        window.scrollTo(0, 0);
        console.log(this.state);
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleClick = (event, id) => {
        this.setState({ObservationId: id, openDetails: true});
    };

    handleChangePage = (event, page) => {
        this.setState({page, openDetails: false, pageDidChange: true});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value, openDetails: false, countDidChange: true});
    };

    renderMarks = (marks) => {
        let markComponents = [];
        for (let i = 0; i < marks.length; i++) {
            const {number, position} = marks[i];
            markComponents.push(<MarkChip key={i} number={number} position={position}/>)
        }
        return markComponents;
    };

    renderTags = (tags) => {
        let tagComponents = [];
        for (let i = 0; i < tags.length; i++) {
            const {number, position, color} = tags[i];
            tagComponents.push(<TagChip key={i} number={number} position={position} color={color}/>)
        }
        return tagComponents;
    };

    setFilter = (filterSeals, filter) => {
        this.setState({
            filterSeals: filterSeals,
            filter: filter
        });
    };

    marksAreEqual = (filterMarks, observationMarks) => {
        const filterMarkValues = Object.values(filterMarks);
        console.log(filterMarkValues);
        return true;
    };

    tagsAreEqual = (filterTags, observationTags) => {
        return true;
    };

    applyFilter = (observation) => {
        const {filter, filterSeals} = this.state;

        const filters = Object.entries(filter);
        for (let i = 0; i < filters.length; i++) {
            let [filterName, filterValue] = filters[i];
            console.log(filterName, filterValue);
            switch (filterName) {
                case 'name':
                    if (filterValue && filterValue !== observation.Name) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'marks':
                    if (!this.marksAreEqual(filterValue, observation.marks)) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'tags':
                    if (!this.tagsAreEqual(filterValue, observation.tags)) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'sex':
                    if (observation.Sex && filterValue && filterValue !== observation.Sex) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'dateStart': {
                    const filterDate = new Date(filterValue);
                    const observationDate = new Date(observation.Date);

                    if (observationDate < filterDate) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                }
                break;
                case 'dateEnd': {
                    const filterDate = new Date(filterValue);
                    const observationDate = new Date(observation.Date);

                    if (observationDate > filterDate) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                }
                break;
                case 'location':
                    if (observation.Location && filterValue && filterValue !== observation.Location) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'recorder':
                    if (observation.Recorder && filterValue && filterValue !== observation.Recorder) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'fieldLeaders':
                    if (_.difference(filterValue, observation.FieldLeaders).length > 0) {
                        console.log(`Broke on ${filterName}`);
                        return false
                    }
                    break;
                case 'ageClass':
                    if (observation.Age && filterValue && isNaN(observation.Age) && filterValue !== observation.Age) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'ageDays':
                    if (!isNaN(observation.Age) && filterValue !== Number.parseInt(observation.Age)) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'pupCount':
                    if (observation.PupCount && filterValue && filterValue !== observation.PupCount) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                case 'molt':
                    if (observation.MoltPercentage && Number.parseInt(filterValue) > observation.MoltPercentage) {
                        console.log(`Broke on ${filterName}`);
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        return true;
    };

    renderPendingObservations = () => {
        const {classes} = this.props;
        const {order, orderBy, rowsPerPage, page} = this.state;
        const {pendingObservations} = this.props;

        if (!pendingObservations) {
            return null;
        }
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, pendingObservations.length - page * rowsPerPage);
        return (
            <TableBody className={classes.tableBody}>
                {stableSort(pendingObservations, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter(this.applyFilter)
                    .map(n => {
                        return (
                            <TableRow
                                hover
                                onClick={event => this.handleClick(event, n.ObservationId)}
                                tabIndex={-1}
                                key={n.ObservationId}
                            >
                                <TableCell component="th" scope="row">
                                    {new Date(n.Date).toDateString()}
                                </TableCell>
                                <TableCell align="left">{n.FieldLeaders.join(', ')}</TableCell>
                                <TableCell align="left">{n.Location}</TableCell>
                                <TableCell align="left">{n.Sex}</TableCell>
                                <TableCell align="left">{n.Age}</TableCell>
                                <TableCell align="left">{this.renderMarks(n.marks)}</TableCell>
                                <TableCell align="left">{this.renderTags(n.tags)}</TableCell>
                            </TableRow>
                        );
                    })}
                {emptyRows > 0 && (
                    <TableRow style={{height: 49 * emptyRows}}>
                        <TableCell colSpan={6}/>
                    </TableRow>
                )}
            </TableBody>
        );
    };

    handleModalClose = () => {
        this.setState({openDetails: false})
    };

    render() {
        const {classes, pendingObservations} = this.props;
        const {order, orderBy, selected, rowsPerPage, page} = this.state;
        return (
            <>
                <Paper className={classes.root}>
                    <ObservationTableToolbar
                        numSelected={selected.length}
                        filterSeals={this.state.filterSeals}
                        filter={this.state.filter}
                        setFilter={this.setFilter}
                    />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <ObservationTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            {this.renderPendingObservations()}
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 25, 50, 250, 1000, 2000]}
                        component="div"
                        count={pendingObservations.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <PendingObservationDetailsModal open={this.state.openDetails} handleClose={this.handleModalClose}
                                                ObservationId={this.state.ObservationId}/>
            </>
        )
    }
}

ObservationTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        pendingObservations: state.observations.pending,
    }
};

export default connect(mapStateToProps, {getPendingObservations})(withStyles(styles)(ObservationTable));
