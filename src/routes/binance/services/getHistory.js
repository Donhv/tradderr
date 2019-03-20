import axios from "axios";
import properties from "../../../config/properties";
import TableTrade from "../../../models/table_view/TableTrade";
import CoinInfo from "../../../models/CoinInfo";
import RowTrade from "../../../models/table_view/RowTrade";
import logger from "../../../config/winston";
import Constants from "../../../utils/constants";


const getHistory = (symbol, limit) => {
    const url = `${properties.get("binance.url")}/v1/historicalTrades?symbol=${symbol.toUpperCase()}&limit=${limit}`;
    logger.info(`URL request ${url}`);
    return axios.get(url).then(response => {
        const tradeData = response.data;
        const coinInfo = new CoinInfo(symbol);

        const listRow = tradeData;
        const rows = [];
        listRow.forEach(jsonRow => {
            const row = new RowTrade();
            row.fromBinance(jsonRow);
            rows.push(row);
        });
        const tableTrade = new TableTrade();
        tableTrade.rows = rows;
        tableTrade.title = Constants.TABLE_HEADER_TITLE_TRADE;
        tableTrade.coinInfo = coinInfo;
        return Promise.resolve(tableTrade);
    });
};

export default getHistory;