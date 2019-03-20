import axios from "axios";
import properties from "../../../config/properties";
import TableTrade from "../../../models/table_view/TableTrade";
import CoinInfo from "../../../models/CoinInfo";
import RowTrade from "../../../models/table_view/RowTrade";
import logger from "../../../config/winston";


const getTrade = (symbol) => {
    const url = `${properties.get("huobi.url")}/market/trade?symbol=${symbol}`;

    logger.info(`URL request ${url}`);

    return axios.get(url).then(response => {
        const tradeData = response.data.tick;
        const coinInfo = new CoinInfo(symbol);

        const listRow = tradeData.data;
        const rows = [];
        listRow.forEach(jsonRow => {
            const row = new RowTrade();
            row.fromHuobi(jsonRow);
            rows.push(row);
        });
        const tableTrade = new TableTrade();
        tableTrade.rows = rows;
        tableTrade.title = "Last trades (markets)";
        tableTrade.coinInfo = coinInfo;
        return Promise.resolve(tableTrade);
    });
};

export default getTrade;