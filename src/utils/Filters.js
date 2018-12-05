export const dataFilter = (data) => {
    let unit = '';
    if (data > -1 && data <1024) {
        unit = "Kb";
        return `${data} ${unit}`
    }
    else if (data > 1023 && data <1048576) {
        data = precisionRound(data/1024, 2);
        unit = "Mb";
        return `${data} ${unit}`
    }
    else {
        data = precisionRound(data/(1024*1024), 2);
        unit = "Gb";
        return `${data} ${unit}`
    }
};

export const precisionRound = (number, precision) => {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};