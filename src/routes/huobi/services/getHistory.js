import axios from "axios";
import properties from "../../../config/properties";
import TableTrade from "../../../models/table_view/TableTrade";
import CoinInfo from "../../../models/CoinInfo";
import RowTrade from "../../../models/table_view/RowTrade";
import logger from "../../../config/winston";
import Constants from "../../../utils/constants";


const getHistory = (symbol, size) => {
    const url = `${properties.get("huobi.url")}/market/history/trade?symbol=${symbol}&size=${size}`;

    logger.info(`URL request ${url}`);

    return axios.get(url).then(response => {
        const tradeData = response.data.data;
        const coinInfo = new CoinInfo(symbol);

        let listCoin = [];

        tradeData.forEach(coin => {
            listCoin = listCoin.concat(coin.data);
        });

        const rows = [];
        listCoin.forEach(jsonRow => {
            const row = new RowTrade();
            row.fromHuobi(jsonRow);
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