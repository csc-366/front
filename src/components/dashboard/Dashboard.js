import React from 'react';
import ObservationTable from "../common/table/ObservationTable";
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../defaultStyles';
import PropTypes from 'prop-types'
import Header from "../common/Header";
import {connect} from 'react-redux';
import history from '../../history';

const styles = theme => {
    return {
        ...defaultStyles(theme),
        singlePageContent: {
            height: '1000px'
        }
    }
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
            sortBy: ''
        }
    }

    componentDidMount() {
        if(!this.props.isLoggedIn) {
            history.replace('/')
        }
    }

    setFilter = (filter, value) => {
        this.setState({filters: {...this.state.filters, [filter]: value}})
    };

    setSortBy = (sortBy) => {
        this.setState({sortBy})
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <Header/>
                <div className="dashboard">
                    <div className={classes.singlePageContent}>
                        <ObservationTable/>
                    </div>
                </div>
            </>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        isLoggedIn: !!state.user.username
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));