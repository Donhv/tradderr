const convertToMillion = (number, floatNumber) => {
    let numberFloat = 0;
    if (floatNumber!==undefined)
        numberFloat = floatNumber;
    let m = 0;
    if (number > 1000000) {
        m = number / 1000000;
        const formatNumber = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: numberFloat, maximumFractionDigits: numberFloat }).format(m);
        return `${formatNumber}M`;
    }

    if (number < 1){
        const formatNumber = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 6, maximumFractionDigits: 6 }).format(number);
        return formatNumber;
    }

    const formatNumber = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: numberFloat, maximumFractionDigits: numberFloat }).format(number);
    return formatNumber;
};

const convertToPercent = (number, floatNumber) => {
    let numberFloat = 0;
    if (floatNumber!==undefined)
        numberFloat = floatNumber;

    const formatNumber = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: numberFloat, maximumFractionDigits: numberFloat }).format(number);
    return `${formatNumber}%`;
};



export {convertToMillion, convertToPercent};