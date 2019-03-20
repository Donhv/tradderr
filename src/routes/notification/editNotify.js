import jwt from "jsonwebtoken";
import logger from "../../config/winston";
import Message from "../../utils/message";
import properties from "../../config/properties";
import Notify from "../../models/Notify";


const editNotify = (req, res) => {
    const { token } = req.headers;
    let { id, exchange,name, symbol, thresholdType, threshold } = req.body;

    logger.info(`add Notify: ${exchange} ${name}/ ${symbol} / ${thresholdType} / ${threshold}`);

    try {
        const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
        const { email } = decoded;
        Notify.findOne({ _id: id, email }).then(notify => {
        	exchange = exchange || notify.exchange;
	        name = name || notify.name;
	        symbol = symbol || notify.symbol;
	        thresholdType = thresholdType || notify.thresholdType;
	        threshold = threshold || notify.threshold;
            if (notify) {
                return Notify.findOneAndUpdate(
                    {
                        _id: id
                    },
                    {
                        exchange, symbol, name, threshold, thresholdType
                    },
                    {
                        new: true
                    }
                );
            }
            return Promise.reject();
        }).then((result) => {
            res.status(200).json({
                code: Message.SUCCESS,
                data: result.toJson()
            });
        }).catch(err => {
            logger.error(err);
            res.status(500).json({
                code: Message.FAILED,
                message: Message.NOTIFY_NOT_FOUND
            });
        });
    } catch (err) {
        res.status(401).json({
            code: Message.FAILED,
            message: Message.INVALID_TOKEN
        });
    }
};

export default editNotify;
