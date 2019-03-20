import jwt from "jsonwebtoken";
import Message from "../../utils/message";
import logger from "../../config/winston";
import Favorite from "../../models/Favorite";
import getTickers from "./services/getTickers";
import properties from "../../config/properties";


const tickers = (req, res) => {
    logger.info("binance get ticker ");
    let {
        quotes
    } = req.query;
    quotes = quotes === undefined ? "USDT" : quotes;
    logger.info(`QUOTES SYMBOL = ${quotes}`);


    const { token } = req.headers;
    const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
    const { email } = decoded;

    Favorite.find({ email }).then((result) => {
        const listCoin = result.map(a => a.coin);
        return Promise.resolve(listCoin);
    }).then(favs => {
        getTickers(favs, quotes).then(data => {
            res.json({
                code: Message.SUCCESS,
                data: data
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
    }).catch(err=>{
        logger.error(`binance ticker.js ${err}`);
    });;
};

export default tickers;