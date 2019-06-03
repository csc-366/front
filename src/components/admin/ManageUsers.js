import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../defaultStyles';
import Header from "../common/Header";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {setManagedUser, getAllUsers} from "../../actions/admin";
import {connect} from 'react-redux';
import ManageUserModal from "./ManageUserModal";
import history from "../../history";

const styles = theme => ({
    ...defaultStyles(theme),
    root: {
        alignSelf: 'center',
        width: '98%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    title: {
        flex: '0 0 auto',
        padding: theme.spacing.unit * 2
    }
});

class ManageUsers extends React.Component {
    componentDidMount() {
        if (!this.props.isLoggedIn) {
            history.replace('/');
        }
        this.props.getAllUsers();
    }

    setManagedUser = (user) => () => {
        this.props.setManagedUser(user);
    };

    renderTableRow = (row) => {
        return (
            <TableRow key={row.username} hover onClick={
                this.setManagedUser(row)
            }>
                <TableCell component="th" scope="row">
                    {`${row.firstName} ${row.lastName}`}
                </TableCell>
                <TableCell align="right">{row.affiliation ? row.affiliation : 'None'}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
            </TableRow>
        )
    };

    renderUserTable = () => {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.title}>
                    <Typography variant={"h6"} id={"tableTitle"}>Users</Typography>
                </div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Affiliation</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Account Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.users.map(row => this.renderTableRow(row))}
                    </TableBody>
                </Table>
            </Paper>
        )
    };

    render() {
        return (
            <div>
                <Header/>
                {this.renderUserTable()}
                <ManageUserModal/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        isLoggedIn: !!state.user.username
    }
};

export default connect(mapStateToProps, {setManagedUser, getAllUsers})(withStyles(styles)(ManageUsers));