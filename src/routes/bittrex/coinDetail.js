import Message from "../../utils/message";
import logger from "../../config/winston";
import getCoinDetail from "./services/getCoinDetail";


const coin = (req, res) => {
    logger.info("houbi get detail coin ");
    const {
        symbol
    } = req.query;
    logger.info(`symbol= ${symbol}`);

    getCoinDetail(symbol).then(coinDetail => {
        res.json({
            code: Message.SUCCESS,
            data: coinDetail
        });
    }).catch(error => {
        logger.error(error);
        res.status(500).json({
            code: Message.FAILED,
            data: {
                message: Message.SYSTEM_ERROR
            }
        });
    });
};

export default coin;