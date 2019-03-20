const times = {
    TIME_1_MIN: "1min",
    TIME_5_MIN: "5min",
    TIME_15_MIN: "15min",
    TIME_30_MIN: "30min",
    TIME_1_HOUR: "1hour",
    TIME_4_HOUR: "4hour",
    TIME_1_DAY: "1day",
    TIME_5_DAY: "1day",
    TIME_1_WEEK: "1week",
    TIME_1_MONTH: "1mon",
    TIME_1_YEAR: "1year"
};

const convertToBittex = (input) => {
    switch (input) {
        case times.TIME_1_MIN:
            return "oneMin";
        case times.TIME_5_MIN:
            return "fiveMin";
        case times.TIME_15_MIN:
            return "thirtyMin";
        case times.TIME_30_MIN:
            return "thirtyMin";
        case times.TIME_1_HOUR:
            return "hour";
        case times.TIME_4_HOUR:
            return "fourHour";
        case times.TIME_1_DAY:
            return "day";
        case times.TIME_5_DAY:
            return "fiveDay";
        case times.TIME_1_WEEK:
            return "week";
        case times.TIME_1_MONTH:
            return "month";
        case times.TIME_1_YEAR:
            return "year";
        default:
            return input;
    }
};
const convertToBinance = (input) => {
    switch (input) {
        case times.TIME_1_MIN:
            return "1m";
        case times.TIME_5_MIN:
            return "5m";
        case times.TIME_15_MIN:
            return "15m";
        case times.TIME_30_MIN:
            return "30m";
        case times.TIME_1_HOUR:
            return "1h";
        case times.TIME_4_HOUR:
            return "4h";
        case times.TIME_1_DAY:
            return "1d";
        case times.TIME_5_DAY:
            return "5d";
        case times.TIME_1_WEEK:
            return "1w";
        case times.TIME_1_MONTH:
            return "1M";
        case times.TIME_1_YEAR:
            return "1y";
        default:
            return input;
    }
};

export { times, convertToBittex, convertToBinance };