import Message from "../../utils/message";
import logger from "../../config/winston";
import getHistory from "./services/getHistory";

const history = (req, res) => {
    logger.info("bittrex get market trade ");
    const {
        symbol
    } = req.query;
    let {
        limit
    } = req.query;
    if (limit === undefined)
        limit = 10;
    logger.info(`symbol= ${symbol}`);
    logger.info(`limit= ${limit}`);

    getHistory(symbol, limit).then(tableTrade => {
        res.json({
            code: Message.SUCCESS,
            data: tableTrade
        });
    }).catch(error => {
        logger.error(error);
        res.status(500).json({
            code: Message.FAILED,
            data: {
                message: error.response.data.msg
            }
        });
    });
};

export default history;