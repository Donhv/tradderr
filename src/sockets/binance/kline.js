import _ from "lodash";
import logger from "../../config/winston";
import getKline from "../../routes/binance/services/getKline";
import { times } from "../../utils/time";
import getTickers from "../../routes/binance/services/getTickers";

const getCoinDetail = async (socket) => {
    try {
            getTickers().then(result=> {
                return Promise.resolve(result);
            }).then(listCoin => {

                _.map(times, (value) => {
                    listCoin.forEach(item => {
                        getKline(item.symbol, value, 200).then(result=> {
                            socket.emit(`binance.kline.${item.symbol}.${value}`, result);
                        });
                    });
                });
            }).catch(err=> {
                logger.error(err);
            })
    } catch (error) {
        logger.error(`Error: ${error.code}`);
    }
};


const tickers = socket => {
    logger.log("New client connected");
    setInterval(() => getCoinDetail(socket), 10000);
    socket.on("disconnect", () => logger.info("Client disconnected"));
};

export default tickers;