import React from 'react';
import ObservationTable from './ObservationTable';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <ObservationTable/>
            </div>
        )
    }
}

export default Dashboard;