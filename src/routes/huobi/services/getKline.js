import axios from "axios";
import properties from "../../../config/properties";
import CoinInfo from "../../../models/CoinInfo";
import CandleStickChart from "../../../models/candle_chart/CandleStickChart";
import logger from "../../../config/winston";
import CandleItem from "../../../models/candle_chart/CandleItem";


const getKline = (symbol, period, size) => {

    const url = `${properties.get("huobi.url")}/market/history/kline?symbol=${symbol}&period=${period}&size=${size}`;

    logger.info(`URL request ${url}`);

    return axios.get(url).then(response => {
        const listDataChart = response.data.data;
        logger.info("response data length: ", listDataChart.length);
        const coinInfo = new CoinInfo(symbol);
        const ticks = [];
        listDataChart.forEach(tickJson => {
            const tick = new CandleItem();
            tick.fromHuobi(tickJson, period);
            ticks.push(tick);
        });

        const candleChart = new CandleStickChart();
        candleChart.coinInfo = coinInfo;
        candleChart.periodTime = period;
        candleChart.ticks = ticks;
        return Promise.resolve(candleChart);
    });
};

export default getKline;