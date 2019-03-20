import axios from "axios";

import Message from "../../utils/message";
import { convertToMillion, convertToPercent } from "../../utils/numberUtils";
import logger from "../../config/winston";
import properties from "../../config/properties";


const getTicker = (id, convert) => {
    const url = `${properties.get("coin.market.cap.v2")}/ticker/${id}/?convert=${convert}`;
    logger.info(`URL request ${url}`);
    return axios.get(url).then(response => {
        logger.info(response.data);

        const { data } = response.data;
        const { quotes } = response.data.data;
        const usdCurrency = response.data.data.quotes.USD;
        const convertCurrency = response.data.data.quotes[convert.toUpperCase()];

        const dataUsd = {
            price: convertToMillion(usdCurrency.price, 2),
            volume_24h: convertToMillion(usdCurrency.volume_24h, 2),
            market_cap: convertToMillion(usdCurrency.market_cap, 0),
            percent_change_1h: convertToPercent(usdCurrency.percent_change_1h, 2),
            percent_change_24h: convertToPercent(usdCurrency.percent_change_24h, 2),
            percent_change_7d: convertToPercent(usdCurrency.percent_change_7d, 2)
        };
        quotes.USD = dataUsd;

        const dataConvert = {
            price: convertToMillion(convertCurrency.price, 2),
            volume_24h: convertToMillion(convertCurrency.volume_24h, 2),
            market_cap: convertToMillion(convertCurrency.market_cap, 0),
            percent_change_1h: convertToPercent(convertCurrency.percent_change_1h, 2),
            percent_change_24h: convertToPercent(convertCurrency.percent_change_24h, 2),
            percent_change_7d: convertToPercent(convertCurrency.percent_change_7d, 2)
        };
        quotes[convert.toUpperCase()] = dataConvert;
        data.quotes = quotes;
        return Promise.resolve(quotes);
    });
};

const ticker = (req, res) => {
    logger.info("get info ticker");
    const {
        id
    } = req.params;
    let {
        convert
    } = req.query;
    if (convert === undefined) {
        convert = "USD";
    }
    logger.info(`id= ${id}`);
    logger.info(`convert= ${convert}`);
    getTicker(id, convert).then(data => {
        res.json({
            code: Message.SUCCESS,
            data
        });
    }).catch(error => {
        logger.error(error);
        res.status(500).json({
            code: Message.FAILED,
            data: {
                message: error.data.metadata.error
            }
        });
    });
};
export default ticker;