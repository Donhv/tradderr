import axios from "axios";
import properties from "../../../config/properties";
import { convertToBittex } from "../../../utils/time";
import CandleStickChart from "../../../models/candle_chart/CandleStickChart";
import logger from "../../../config/winston";
import CandleItem from "../../../models/candle_chart/CandleItem";


const getKline = (symbol, period, size) => {

    const url = `${properties.get("bittrex.url")}/market/GetTicks?marketName=${symbol}&tickInterval=${convertToBittex(period)}`;
    logger.info(`URL request ${url}`);

    return axios.get(url).then(response => {
        const listDataChart = response.data.result;
        logger.info("response data length: ", listDataChart.length);
        let ticks = [];
        listDataChart.forEach(tickJson => {
            const tick = new CandleItem();
            tick.fromBittrex(tickJson, period);
            ticks.push(tick);
        });
        const candleChart = new CandleStickChart();
        candleChart.periodTime = period;
        ticks = ticks.reverse().slice(0, !(size) ? 200 : size);
        candleChart.ticks = ticks;
        return Promise.resolve(candleChart);
    });
};

export default getKline;