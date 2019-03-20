import axios from "axios";
import CoinInfo from "../../../models/CoinInfo";
import logger from "../../../config/winston";
import CoinDetail from "../../../models/CoinDetail";
import properties from "../../../config/properties";


const getCoinDetail = (symbol) => {
    const url = `${properties.get("huobi.url")}/market/detail/merged?symbol=${symbol}`;
    logger.info("URL request", url);
    return axios.get(url).then(response => {
        const coinDetailJson = {...response.data.tick, symbol};
        const coinDetail = new CoinDetail();
        coinDetail.fromHoubi(coinDetailJson);
        const coinInfo = new CoinInfo(symbol);
        return Promise.resolve({...coinDetail, coinInfo});
    });
};

export default getCoinDetail;