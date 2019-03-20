import axios from "axios";
import properties from "../../../config/properties";
import { convertToBinance } from "../../../utils/time";
import CandleStickChart from "../../../models/candle_chart/CandleStickChart";
import logger from "../../../config/winston";
import CandleItem from "../../../models/candle_chart/CandleItem";


const getKline = (symbol, period, size) => {
    const url = `${properties.get("binance.url")}/v1/klines?symbol=${symbol.toUpperCase()}&interval=${convertToBinance(period)}&limit=${!(size) ? 200 : size}`;
    logger.info(`URL request ${url}`);

    return axios.get(url).then(response => {
        const listDataChart = response.data;
        logger.info("response data length: ", listDataChart.length);
        let ticks = [];
        listDataChart.forEach(tickJson => {
            const tick = new CandleItem();
            tick.fromBinance(tickJson, period);
            ticks.push(tick);
        });
        const candleChart = new CandleStickChart();
        candleChart.periodTime = period;
        ticks = ticks.reverse();
        candleChart.ticks = ticks;
        return Promise.resolve(candleChart);
    });
};

export default getKline;