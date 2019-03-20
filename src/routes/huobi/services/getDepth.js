import axios from "axios";
import properties from "../../../config/properties";
import { formatDate } from "../../../utils/datetimeUtils";
import CoinInfo from "../../../models/CoinInfo";
import LineChart from "../../../models/line_chart/LineChart";
import Line from "../../../models/line_chart/Line";
import logger from "../../../config/winston";
import Point from "../../../models/line_chart/Point";


const getDepth = (symbol, type) => {
    const url = `${properties.get("huobi.url")}/market/depth?symbol=${symbol}&type=${type}`;

    logger.info("URL request", url);

    return axios.get(url).then(response => {
        const tickData = response.data.tick;
        const coinInfo = new CoinInfo(symbol);

        const bids = [];
        const listBids = tickData.bids;
        listBids.forEach(b => {
            const point = new Point(b);
            bids.push(point);
        });
        const lineBids = new Line();
        lineBids.points = bids;
        lineBids.id = tickData.id;
        lineBids.ts = tickData.ts;
        lineBids.displayDate = formatDate(new Date(tickData.ts));

        const asks = [];
        const listAsks = tickData.asks;
        listAsks.forEach(b => {
            const point = new Point(b);
            asks.push(point);
        });
        const lineAsks = new Line();
        lineAsks.points = asks;
        lineAsks.id = tickData.id;
        lineAsks.ts = tickData.ts;
        lineAsks.displayDate = formatDate(new Date(tickData.ts));

        const lineChart = new LineChart();
        lineChart.type = type;
        lineChart.coinInfo = coinInfo;
        lineChart.bids = lineBids;
        lineChart.asks = lineAsks;
        return Promise.resolve(lineChart);
    });
};

export default getDepth;