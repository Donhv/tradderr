import axios from "axios";

import Message from "../../utils/message";
import logger from "../../config/winston";
import properties from "../../config/properties";
import CoinDetail from "../../models/CoinDetail";


const getTickers = (start, limit, convert) => {
    const url = `${properties.get("coin.market.cap.v2")}/ticker?convert=${convert}&limit=20&start=${start}&structure=array`;
    logger.info("URL request", url);
    return axios.get(url).then(response => {
        const listCoin = response.data.data;
        logger.info("response data length: ", listCoin.length);
        const listResult = [];
        listCoin.forEach(coin => {
            const coinDetail = new CoinDetail();
            coinDetail.fromCoinMarketCap(coin, convert);
            coinDetail.image = {
                64: `${properties.get("coin.market.cap.image2")}/64x64/${coin.id}.png`,
                128: `${properties.get("coin.market.cap.image2")}/128x128/${coin.id}.png`
            };
            listResult.push(coinDetail);
        });
        return Promise.resolve(listResult);
    });
};

const tickers = (req, res) => {
    logger.info("coinmarket get ticker ");
    const {
        start,
        limit,
        convert
    } = req.query;
    logger.info(`start= ${start}`);
    logger.info(`limit= ${limit}`);
    logger.info(`convert= ${convert}`);

    getTickers(start, limit, convert).then(listResult => {
        res.json({
            code: Message.SUCCESS,
            data: listResult
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

export default tickers;