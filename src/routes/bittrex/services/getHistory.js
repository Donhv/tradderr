import axios from "axios";
import properties from "../../../config/properties";
import TableTrade from "../../../models/table_view/TableTrade";
import CoinInfo from "../../../models/CoinInfo";
import RowTrade from "../../../models/table_view/RowTrade";
import logger from "../../../config/winston";
import Constants from "../../../utils/constants";


const getHistory = (symbol, limit) => {
    const url = `${properties.get("bittrex.url.v1")}/getmarkethistory?market=${symbol}`;

    logger.info(`URL request ${url}`);

    return axios.get(url).then(response => {
        const tradeData = response.data.result;
        const coinInfo = new CoinInfo(symbol.replace("-", ""));

        const listRow = tradeData;
        let rows = [];
        listRow.forEach(jsonRow => {
            const row = new RowTrade();
            row.fromBittrex(jsonRow);
            rows.push(row);
        });
        rows = rows.slice(0, limit);
        const tableTrade = new TableTrade();
        tableTrade.rows = rows;
        tableTrade.title = Constants.TABLE_HEADER_TITLE_TRADE;
        tableTrade.coinInfo = coinInfo;
        return Promise.resolve(tableTrade);
    });
};

export default getHistory;