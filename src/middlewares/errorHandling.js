import logger from "../config/winston";
import Message from "../utils/message";

const errorHandling = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send({
        message: Message.FAILED,
        data: Message.SYSTEM_ERROR
    })
};

export default errorHandling;