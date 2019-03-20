import getCoinDetail from "./services/getCoinDetail";
import Message from "../../utils/message";
import logger from "../../config/winston";

const headers = ['BTCUSDT', 'ETHUSDT', 'LTCUSDT'];

const summary = (req, res) => {
    Promise.all([getCoinDetail(headers[0]), getCoinDetail(headers[1]), getCoinDetail(headers[2])]).then(values => {
        res.json({
            code: Message.SUCCESS,
            data: values
        })
    }).catch(err=> {
        logger.error(err);
        res.json({
            code: Message.FAILED,
            message: Message.SYSTEM_ERROR
        });
    });
};

export default summary;