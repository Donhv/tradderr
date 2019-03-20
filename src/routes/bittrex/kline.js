import Message from "../../utils/message";
import logger from "../../config/winston";
import getKline from "./services/getKline";

const kline = (req, res) => {
    logger.info("bittrex get history kline ");
    const {
        symbol,
        period,
	    size
    } = req.query;
    logger.info(`symbol= ${symbol}`);
    logger.info(`period= ${period}`);
    logger.info(`size= ${size}`);
    getKline(symbol, period, size).then(candleChart => {
        res.json({
            code: Message.SUCCESS,
            data: candleChart
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
export default kline;