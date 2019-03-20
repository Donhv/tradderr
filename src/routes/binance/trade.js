import Message from "../../utils/message";
import logger from "../../config/winston";
import getTrade from "./services/getTrade";

const trade = (req, res) => {
    logger.info("bittrex get market trade ");
    let {
        type,
        limit
    } = req.query;

    const {
        symbol

    } = req.query;

    if (type === undefined) {
        type = "both";
    }

    if (limit === undefined) {
        limit = 10;
    }
    logger.info(`symbol= ${symbol}`);
    logger.info(`type= ${type}`);
    logger.info(`limit= ${limit}`);

    getTrade(symbol, limit, type).then(tableTrade => {
        res.json({
            code: Message.SUCCESS,
            data: tableTrade
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

export default trade;