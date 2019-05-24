import React from 'react';
import ObservationTable from "../common/table/ObservationTable";
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../defaultStyles';
import PropTypes from 'prop-types'

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

    setFilter = (filter, value) => {
        this.setState({filters: {...this.state.filters, [filter]: value}})
    };

    setSortBy = (sortBy) => {
        this.setState({sortBy})
    };

    render() {
        const {classes} = this.props;
        return (
            <div className="dashboard">
                <div className={classes.singlePageContent}>
                    <ObservationTable/>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);