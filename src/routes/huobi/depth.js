import Message from "../../utils/message";
import logger from "../../config/winston";
import getDepth from "./services/getDepth";

const depth = (req, res) => {
    logger.info("houbi get market depth ");
    const {
        symbol,
        type
    } = req.query;
    logger.info(`symbol= ${symbol}`);
    logger.info(`type= ${type}`);


    getDepth(symbol, type).then(lineChart => {
        res.json({
            code: Message.SUCCESS,
            data: lineChart
        });
    }).catch(error => {
        logger.error(error);
        res.status(500).json({
            code: Message.FAILED,
            data: Message.SYSTEM_ERROR
        });
    });
};
export default depth;