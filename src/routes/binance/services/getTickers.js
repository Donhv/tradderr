import axios from "axios";
import _ from "lodash";
import CoinInfo from "../../../models/CoinInfo";
import logger from "../../../config/winston";
import CoinDetail from "../../../models/CoinDetail";

import properties from "../../../config/properties";

const getTickers = (favs, quotes) => {
    const url = `${properties.get("binance.url")}/v1/ticker/24hr`;
    logger.info(`URL request ${url}`);
    return axios.get(url).then(response => {
        const listCoin = response.data;
        logger.info("response data length: ", listCoin.length);
        const listResult = [];

        listCoin.forEach(coin => {
            const coinDetail = new CoinDetail();
            coinDetail.fromBinance(coin);
            const coinInfo = new CoinInfo(coin.symbol);
            coinDetail.name = coinInfo.name;
            coinDetail.quoteCurrency = coinInfo.quoteCurrency;
            coinDetail.baseCurrency = coinInfo.baseCurrency;
            if (favs) {
                coinDetail.favorite = favs.includes(coinDetail.symbol);
            }
            listResult.push(coinDetail);
        });
        if (quotes) {
            const orderList = _.orderBy(listResult, ["priceValue"], ["desc"]).filter(a => a.quoteCurrency.toLowerCase() === quotes.toLowerCase());
            return Promise.resolve(orderList);
        }
        return Promise.resolve(listResult);
    });
};

export default getTickers;