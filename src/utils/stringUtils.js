import logger from "../config/winston";

const beautifulHuobiCoinName =  (coin) => {
    try {
        const baseCurrency = coin["base-currency"];
        const quoteCurrency = coin["quote-currency"];
        return `${baseCurrency.toUpperCase()}/${quoteCurrency.toUpperCase()}`;
    } catch (e) {
        // logger.error("error to parser beautifulHuobiCoinName", e);
        return "";
    }
};

const baseCoinHuobi =  (coin) => {
    try {
        const baseCurrency = coin["base-currency"];
        return baseCurrency;
    } catch (e) {
        // logger.error("error to parser baseCoinHuobi", e);
        return "";
    }
};

const quoteCoinHuobi =  (coin) => {
    try {
        const quoteCurrency = coin["quote-currency"];
        return quoteCurrency;
    } catch (e) {
        // logger.error("error to parser quoteCoinHuobi", e);
        return "";
    }
};

const hashString = (str) => {
    let hash = 5381;
    let i    = str.length;

    while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
};

export {beautifulHuobiCoinName, baseCoinHuobi, quoteCoinHuobi, hashString};