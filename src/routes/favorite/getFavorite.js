import jwt from "jsonwebtoken";

import Favorite from "../../models/Favorite";
import Message from "../../utils/message";
import logger from "../../config/winston";
import getAllCoin from "./services/getAllFavorite";
import properties from "../../config/properties";

const getFavorite = (req, res) => {
    const { token } = req.headers;
    const {
        exchange
    } = req.query;
    logger.info(`token=${token}`);
    logger.info(`exchange=${exchange}`);
    try {
        const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
        const { email } = decoded;

        Favorite.find({ email }).then((result) => {
            const listCoin = result.map(a => a.coin);
            logger.info(listCoin);
            getAllCoin(exchange).then(coins => {
                const favorites = [];
                coins.forEach(a => {
                    if (a) {
                        if (listCoin.includes(a.symbol)) {
                            favorites.push(a);
                        }
                    }
                });
                res.json({
                    code: Message.SUCCESS,
                    data: favorites
                });
            });
        }).catch(err => {
            logger.error(err);
            res.status(500).json({
                code: Message.FAILED,
                data: Message.SYSTEM_ERROR
            });
        });

    } catch (err) {
        res.status(401).json({
            code: Message.FAILED,
            message: Message.INVALID_TOKEN
        });
    }
};
export default getFavorite;