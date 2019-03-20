import Message from "../../utils/message";
import logger from "../../config/winston";
import getTrade from "./services/getTrade";


const trade = (req, res) => {
    logger.info("houbi get market trade ");
    const {
        symbol
    } = req.query;
    logger.info(`symbol= ${symbol}`);

    getTrade(symbol).then(data => {
        res.json({
            code: Message.SUCCESS,
            data
        });
    }).catch(error => {
        logger.error(error);
        res.status(500).json({
            code: Message.FAILED,
            data: Message.SYSTEM_ERROR
        });
    });
};

export default trade;