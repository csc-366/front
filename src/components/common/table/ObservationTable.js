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
import {createData, stableSort, getSorting} from './util';
import ObservationTableHead from './ObservationTableHead';
import ObservationTableToolbar from './ObservationTableToolbar';
import MarkChip from "./MarkChip";
import TagChip from "./TagChip";
import ObservationDetailsModal from "../../details/ObservationDetailsModal";


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
        data: [
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'J', [{
                number: '7XPP',
                position: 'L'
            }, {number: '7XPP', position: 'L'}], [{number: '8RQP', color: 'W', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'B', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'P', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'V', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'R', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'Y', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'O', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'M', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'A', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
            createData(new Date().toDateString(), 'CC', 'ACC', 'F', 'J', [{
                number: '7XPP',
                position: 'L'
            }], [{number: '8RQP', color: 'G', position: 'Ri-so-Si'}]),
        ],
        page: 0,
        rowsPerPage: 5,
        openDetails: false,
        observationId: -1
    };

    // noinspection JSCheckFunctionSignatures
    componentDidUpdate() {
        window.scrollTo(0, 0)
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
        this.setState({observationId: id, openDetails: true});
    };

    handleChangePage = (event, page) => {
        this.setState({page, openDetails: false});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value, openDetails: false});
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

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <>
                <Paper className={classes.root}>
                    <ObservationTableToolbar numSelected={selected.length}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <ObservationTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(data, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, n.id)}
                                                tabIndex={-1}
                                                key={n.id}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {n.date}
                                                </TableCell>
                                                <TableCell align="left">{n.fieldLeaders}</TableCell>
                                                <TableCell align="left">{n.location}</TableCell>
                                                <TableCell align="left">{n.sex}</TableCell>
                                                <TableCell align="left">{n.age}</TableCell>
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
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 25, 50, 250, 1000, 2000]}
                        component="div"
                        count={data.length}
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
                <ObservationDetailsModal open={this.state.openDetails} observationId={this.state.observationId}/>
            </>
        );
    }
}

ObservationTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ObservationTable);
