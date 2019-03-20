import getTickersFromHuobi from "../../routes/huobi/services/getTickers";
import logger from "../../config/winston";

const getCoinDetail = async (socket) => {
    try {
        getTickersFromHuobi().then(result=> {
           result.forEach(item=> {
               socket.emit(`huobi.${item.symbol}.detail`, item);
           });
            socket.emit(`huobi.tickers`, result.slice(0, 20));
        });

    } catch (error) {
        logger.error(`Error: ${error.code}`);
    }
};

export default getCoinDetail;