import axios from "axios";

import Message from "../../utils/message";
import { convertToMillion } from "../../utils/numberUtils";
import logger from "../../config/winston";
import properties from "../../config/properties";


const getGlobal = (convert) => {
    const url = `${properties.get("coin.market.cap.v2")}/global/?convert=${convert}`;
    logger.info("URL request", url);
    return axios.get(url).then(response => {
        logger.info(response.data);
        const { data } = response.data;
        const { quotes } = response.data.data;
        const usdCurrency = response.data.data.quotes.USD;
        const convertCurrency = response.data.data.quotes[convert.toUpperCase()];
        const dataUsd = {
            total_market_cap: convertToMillion(usdCurrency.total_market_cap, 2),
            total_volume_24h: convertToMillion(usdCurrency.total_volume_24h, 2)
        };
        quotes.USD = dataUsd;
        const dataConvert = {
            total_market_cap: convertToMillion(convertCurrency.total_market_cap, 2),
            total_volume_24h: convertToMillion(convertCurrency.total_volume_24h, 2)
        };
        quotes[convert.toUpperCase()] = dataConvert;
        data.active_cryptocurrencies = convertToMillion(data.active_cryptocurrencies, 0);
        data.active_markets = convertToMillion(data.active_markets, 0);
        data.quotes = quotes;
        return Promise.resolve(data);
    });
};

const global = (req, res) => {
    logger.info("get global market");
    let {
        convert
    } = req.query;
    logger.info(`convert= ${convert}`);
    if (convert === undefined) {
        convert = "USD";
    }
    getGlobal(convert).then(data => {
        res.json({
            code: Message.SUCCESS,
            data
        });
    }).catch(error => {
        logger.error(error);
        res.status(500).json({
            code: Message.FAILED,
            data: {
                message: Message.SYSTEM_ERROR
            }
        });
    });
};

export default global;