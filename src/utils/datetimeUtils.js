import moment from "moment";
import logger from "../config/winston";

const formatDate = (inputDate) => {
    const m = moment(inputDate);
    return m.format("YYYY-MM-DD")
};

const formatDatetime = (inputDate) => {
    const m = moment(inputDate);
    return m.format("MM-DD hh:mm");
};

const fromTimestampToBeautifulDate =  (timestamp, period) => {
    try {
        const date = new Date(timestamp);
        switch (period) {
            case "1min":
                return formatDatetime(date);
            case "5min":
                return formatDatetime(date);
            case "15min":
                return formatDatetime(date);
            case "30min":
                return formatDatetime(date);
            case "1hour":
                return formatDatetime(date);
            case "4hour":
                return formatDatetime(date);
            case "1day":
                return formatDate(date);
            case "1week":
                return formatDate(date);
            case "1mon":
                return formatDate(date);
            case "1year":
                return formatDate(date);
            default:
                return formatDatetime(date);
        }

    } catch (e) {
        logger.error(`error to parser datetime: ${e}`);
        return timestamp;
    }
};



export  {fromTimestampToBeautifulDate, formatDatetime, formatDate};