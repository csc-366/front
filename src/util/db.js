import {createData} from "../components/common/table/util";

const observation = createData(
    new Date().toDateString(),
    'CC',
    'ACC',
    'M',
    'J',
    [{
        number: '7XPP',
        position: 'L'
    }],
    [{
        number: '8R4Q',
        color: 'O',
        position: 'Ri-ol-Si'
    }]
);

export const getObservation = (observationId) => {
    return observation;
};