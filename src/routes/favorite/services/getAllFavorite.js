import Promise from "bluebird";
import properties from "../../../config/properties";
import CoinInfo from "../../../models/CoinInfo";
import CoinDetail from "../../../models/CoinDetail";
import logger from "../../../config/winston";
import { callApi } from "../../../utils/utils";


const getAllHuobi = (list) => {
    const listResult = [];

    list.forEach(coin => {
        if (coin) {
            const coinDetail = new CoinDetail();
            coinDetail.fromHoubi(coin);
            const coinInfo = new CoinInfo(coin.symbol);
            coinDetail.name = coinInfo.name || coinDetail.symbol;
            coinDetail.quoteCurrency = coinInfo.quoteCurrency;
            coinDetail.baseCurrency = coinInfo.baseCurrency;
            listResult.push(coinDetail);
        }
    });
    return listResult;
};

const getAllBittrex = (listCoin) => {
    const listResult = [];

    listCoin.forEach(coin => {
        const coinDetail = new CoinDetail();
        coinDetail.fromBittrex(coin);
        listResult.push(coinDetail);
    });
    return listResult;
};

const getAllBinance = (listCoin) => {
    const listResult = [];

    listCoin.forEach(coin => {
        const coinDetail = new CoinDetail();
        coinDetail.fromBinance(coin);
        const coinInfo = new CoinInfo(coin.symbol);
        coinDetail.name = coinInfo.name || coinDetail.symbol;
        coinDetail.quoteCurrency = coinInfo.quoteCurrency;
        coinDetail.baseCurrency = coinInfo.baseCurrency;

        listResult.push(coinDetail);
    });
    return listResult;
};

const getAllCoin = (exchange) => {
    const huobiUrl = `${properties.get("huobi.url")}/market/tickers`;
    const bittrexUrl = `${properties.get("bittrex.url")}/markets/GetMarketSummaries`;
    const binanceUrl = `${properties.get("binance.url")}/v1/ticker/24hr`;

    if (exchange) {
        let url = huobiUrl;
        if (exchange.toLowerCase() === "bittrex") {
            url = bittrexUrl;
        }
        if (exchange.toLowerCase() === "binance") {
            url = binanceUrl;
        }

        return callApi(url).then(res => {
            const listDataChart = res;
            logger.info("response data length: ", listDataChart.length);
            let listResult = [];
            if (exchange.toLowerCase() === "huobi") {
                listResult = getAllHuobi(listDataChart);
            }
            if (exchange.toLowerCase() === "bittrex") {
                listResult = getAllBittrex(listDataChart);
            }
            if (exchange.toLowerCase() === "binance") {
                listResult = getAllBinance(listDataChart);
            }
            return Promise.resolve(listResult);
        }).catch(err => {
            logger.error(err);
            return Promise.resolve([]);
        });
    }

    return Promise.all([callApi(huobiUrl), callApi(bittrexUrl), callApi(binanceUrl)])
        .then((res) => {
            let list = [];
            if (res[0]) {
                const listDataChart = res[0].data;
                const listResult = getAllHuobi(listDataChart);
                list = list.concat(listResult);
            }
            if (res[1]) {
                const listCoin = res[1].result;
                const listResult = getAllBittrex(listCoin);
                list = list.concat(listResult);
            }
            if (res[2]) {
                const listCoin = res[2];
                const listResult = getAllBinance(listCoin);
                list = list.concat(listResult);
            }
            return Promise.resolve(list);
        }).catch(err => {
            logger.error(err);
            return Promise.resolve([]);
        });
};

export default getAllCoin;