import axios from "axios";
import properties from "../../../config/properties";
import TableTrade from "../../../models/table_view/TableTrade";
import CoinInfo from "../../../models/CoinInfo";
import RowTrade from "../../../models/table_view/RowTrade";
import logger from "../../../config/winston";
import Constants from "../../../utils/constants";

const getTrade = (symbol, type, limit) => {
    const url = `${properties.get("bittrex.url.v1")}/getorderbook?market=${symbol}&type=${type}`;
    logger.info(`URL request ${url}`);
    return axios.get(url).then(response => {
        const tradeData = response.data.result;
        const coinInfo = new CoinInfo(symbol.replace("-", ""));
        if (type === "both") {
            const listRowBuy = tradeData.buy;
            const listRowSell = tradeData.buy;
            let rows = [];
            listRowBuy.forEach(jsonRow => {
                const row = new RowTrade();
                row.fromBittrexOrderBook(jsonRow, "buy");
                rows.push(row);
            });
            listRowSell.forEach(jsonRow => {
                const row = new RowTrade();
                row.fromBittrexOrderBook(jsonRow, "sell");
                rows.push(row);
            });
            rows = rows.slice(0, limit);
            const tableTrade = new TableTrade();
            tableTrade.rows = rows;
            tableTrade.title = Constants.TABLE_HEADER_TITLE_TRADE;
            tableTrade.coinInfo = coinInfo;
            return Promise.resolve(tableTrade);
        }

        const listRow = tradeData;
        const rows = [];
        listRow.forEach(jsonRow => {
            const row = new RowTrade();
            row.fromBittrexOrderBook(jsonRow, type);
            rows.push(row);
        });

        const tableTrade = new TableTrade();
        tableTrade.rows = rows;
        tableTrade.title = Constants.TABLE_HEADER_TITLE_TRADE;
        tableTrade.coinInfo = coinInfo;
        return Promise.resolve(tableTrade);
    });
};
export default getTrade;