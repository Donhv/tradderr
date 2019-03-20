import getTickersFromBittrex from "../../routes/bittrex/services/getTickers";
import logger from "../../config/winston";

const getCoinDetail = async (socket) => {
    try {

        getTickersFromBittrex().then(result=> {
            result.forEach(item=> {
                socket.emit(`bittrex.${item.symbol}.detail`, item);
            });

            socket.emit(`bittrex.tickers`, result.slice(0, 20));
        });

    } catch (error) {
        logger.error(`Error: ${error.code}`);
    }
};


export default getCoinDetail;