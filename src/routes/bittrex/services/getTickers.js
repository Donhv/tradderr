import axios from "axios";
import _ from "lodash";
import logger from "../../../config/winston";
import properties from "../../../config/properties";
import CoinDetail from "../../../models/CoinDetail";


const getTickers = (favs, quotes) => {

    const url = `${properties.get("bittrex.url")}/markets/GetMarketSummaries`;
    logger.info(`URL request ${url}`);
    return axios.get(url).then(response => {
        const listCoin = response.data.result;
        logger.info("response data length: ", listCoin.length);
        const listResult = [];

        listCoin.forEach(coin => {
            const coinDetail = new CoinDetail();
            coinDetail.fromBittrex(coin);
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