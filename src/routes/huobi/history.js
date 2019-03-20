import Message from "../../utils/message";
import logger from "../../config/winston";
import getHistory from "./services/getHistory";

const history = (req, res) => {
    logger.info("houbi get market trade ");
    const {
        symbol,
        size
    } = req.query;
    logger.info(`symbol= ${symbol}`);
    logger.info(`size= ${size}`);

    getHistory(symbol, size).then(tableTrade=> {
        res.json({
            code: Message.SUCCESS,
            data: tableTrade
        });
    }).catch(error => {
        logger.error(error);
        res.status(500).json({
            code: Message.FAILED,
            data: Message.SYSTEM_ERROR
        });
    });
};
export default history;