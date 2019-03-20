import jwt from "jsonwebtoken";
import logger from "../../config/winston";
import Message from "../../utils/message";
import properties from "../../config/properties";
import Notify from "../../models/Notify";


const addNotify = (req, res) => {
    const { token } = req.headers;
    const { exchange, name, symbol, thresholdType, threshold } = req.body;

    if (!exchange || !symbol || !threshold || !thresholdType) {
	    res.status(500).json({
		    code: Message.FAILED,
		    message: "Param invalid"
	    });
    }

    logger.info(`add Notify: ${exchange} / ${name}/ ${symbol} / ${thresholdType} / ${threshold}`);

    try {
        const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
        const { email } = decoded;
        const notify = new Notify({email, name,exchange: exchange.toLowerCase(), symbol, threshold, thresholdType});
        Notify.findOne({ email, name, exchange: exchange.toLowerCase(), symbol, threshold, status: "PENDING", thresholdType }).then((result) => {
            if (result) {
                return Promise.reject();
            }
            return Promise.resolve();
        }).then(() => {
            notify.save().then((notifyResult) => {
                res.status(200).json({
                    code: Message.SUCCESS,
                    data: notifyResult.toJson()
                });
            });
        }).catch(err => {
            logger.error(err);
            res.status(500).json({
                code: Message.FAILED,
                message: Message.NOTIFY_EXISTS
            });
        });
    } catch (err) {
        res.status(401).json({
            code: Message.FAILED,
            message: Message.INVALID_TOKEN
        });
    }
};

export default addNotify;
