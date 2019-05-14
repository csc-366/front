import React from 'react';
import ObservationTable from './ObservationTable';
import Header from "../common/Header";

class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <Header/>
                <ObservationTable/>
            </div>
        )
    }
}

export default Dashboard;