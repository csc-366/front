import {createData} from "../components/common/table/util";

export const camelCaseObject = (object) => {
    return Object.entries(object).map(([key, value]) => {
        return [key.replace(/^([A-Z])(.+)/, ((match, p1, p2) => `${p1.toLowerCase()}${p2}`)), value]
    }).reduce((agg, [key,value]) => { return {...agg, [key]: value}},{});
};

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