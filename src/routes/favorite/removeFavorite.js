import jwt from "jsonwebtoken";
import Message from "../../utils/message";
import Favorite from "../../models/Favorite";
import logger from "../../config/winston";
import properties from "../../config/properties";


const removeFavorite = (req, res) => {
    const { token } = req.headers;
    const { exchange, coin } = req.body;

    logger.info(`token=${token}`);
    logger.info(`exchange=${exchange}`);
    logger.info(`coin=${coin}`);

    try {
        const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
        const { email } = decoded;
        Favorite.remove({ email, exchange, coin }).then((err) => {
            logger.error(`remove favorite error ${JSON.stringify(err)}`);
            res.json({
                code: Message.SUCCESS,
                data: err
            })
        }).catch(err => {
            logger.error(err);
            res.status(500).json({
                code: Message.FAILED,
                message: Message.SYSTEM_ERROR
            });
        });

    } catch (err) {
        res.status(401).json({
            code: Message.FAILED,
            message: Message.INVALID_TOKEN
        });
    }
};

export default removeFavorite;