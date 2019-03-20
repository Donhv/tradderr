import axios from "axios";
import CoinInfo from "../../../models/CoinInfo";
import logger from "../../../config/winston";
import CoinDetail from "../../../models/CoinDetail";
import properties from "../../../config/properties";

const getCoinDetail = (symbol) => {
    const url = `${properties.get("bittrex.url.v1")}/getmarketsummary?market=${symbol}`;

    logger.info(`URL request ${url}`);

    return axios.get(url).then(response => {

        if (response.data.result.length >= 1) {
            const coinDetailJson = {...response.data.result[0], symbol};
            const coinDetail = new CoinDetail();
            coinDetail.fromBittrexDetail(coinDetailJson);
            const coinInfo = new CoinInfo(symbol.replace("-", ""));
            const curcies = symbol.split("-");
            [coinInfo.quoteCurrency, coinInfo.baseCurrency] = curcies;
            coinInfo.name=`${coinInfo.baseCurrency}/${coinInfo.quoteCurrency}`;
            coinInfo.symbol=symbol;
            coinDetail.name = coinInfo.name;
            return Promise.resolve({...coinDetail, coinInfo});
        }
        return Promise.reject();
    });
};

export default getCoinDetail;