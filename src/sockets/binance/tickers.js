import getTickersFromBinance from "../../routes/binance/services/getTickers";
import logger from "../../config/winston";

const getCoinDetail = async (socket) => {
    try {
        getTickersFromBinance().then(result=> {
            result.forEach(item=> {
                socket.emit(`binance.${item.symbol}.detail`, item);
            });
            socket.emit(`binance.tickers`, result.slice(0, 20));
        });


    } catch (error) {
        logger.error(`Error: ${error.code}`);
    }
};


export default getCoinDetail;