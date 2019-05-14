
const twoDigits = (d) => {
    if (0 <= d && d < 10) {
        return `0${d}`
    } else if (-10 < d && d < 0) {
        return `-0${d}`
    }
    return d.toString();
};

export const jsDateToMySQLDate = (jsDate) => {
    return `${jsDate.getUTCFullYear()}-${twoDigits(jsDate.getUTCMonth() + 1)}-${twoDigits(jsDate.getUTCDate())}`
};
