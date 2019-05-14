import React from 'react';
import Header from '../common/Header';

const dummyData = [
    {
        id: 0,
        date: new Date(),
        location: 'ALLs',
        observer: {
            email: 'test@email.com',
            firstName: 'Test',
            lastName: 'Person',
            affiliation: 'Citizen Scientist'
        },
        ageClass: 'Adult',
        moltPercentage: 0.3,
        comments: 'This is a comment.'
    },
    {
        id: 1,
        date: new Date(),
        location: 'ALLs',
        observer: {
            email: 'test@email.com',
            firstName: 'Test',
            lastName: 'Person',
            affiliation: 'Citizen Scientist'
        },
        ageClass: 'Adult',
        moltPercentage: 0.3,
        comments: 'This is a comment.'
    },
    {
        id: 2,
        date: new Date(),
        location: 'ALLs',
        observer: {
            email: 'test@email.com',
            firstName: 'Test',
            lastName: 'Person',
            affiliation: 'Citizen Scientist'
        },
        ageClass: 'Adult',
        moltPercentage: 0.3,
        comments: 'This is a comment.'
    },
    {
        id: 3,
        date: new Date(),
        location: 'ALLs',
        observer: {
            email: 'test@email.com',
            firstName: 'Test',
            lastName: 'Person',
            affiliation: 'Citizen Scientist'
        },
        ageClass: 'Adult',
        moltPercentage: 0.3,
        comments: 'This is a comment.'
    },
    {
        id: 4,
        date: new Date(),
        location: 'ALLs',
        observer: {
            email: 'test@email.com',
            firstName: 'Test',
            lastName: 'Person',
            affiliation: 'Citizen Scientist'
        },
        ageClass: 'Adult',
        moltPercentage: 0.3,
        comments: 'This is a comment.'
    },
];

class Details extends React.Component {
    renderObservation = observation => {
        return (
            <tr key={observation.id} onClick={() => {console.log(observation.id)}}>
                <td>{observation.id}</td>
                <td>{observation.date.toDateString()}</td>
                <td>{observation.location}</td>
                <td>{observation.observer.firstName} {observation.observer.lastName}</td>
                <td>{observation.ageClass}</td>
                <td>{observation.moltPercentage}</td>
                <td>{observation.comments}</td>
            </tr>
        )
    };

    renderHeader = () => {
        return (
            <>
                <th>ID</th>
                <th>Date</th>
                <th>Location</th>
                <th>Observer</th>
                <th>Age Class</th>
                <th>Molt %</th>
                <th>Comments</th>
            </>
        )
    };

    render() {
        return (
            <>
                <Header/>
            <div>
                <h1>Details</h1>
                <table>
                    <thead>
                    <tr>{this.renderHeader()}</tr>
                    </thead>
                    <tbody>
                    {dummyData.map(this.renderObservation)}
                    </tbody>
                </table>
            </div>
                </>
        )
    }
}

export default Details;