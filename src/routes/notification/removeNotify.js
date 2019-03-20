import Notify from "../../models/Notify";
import Message from "../../utils/message";
import logger from "../../config/winston";

const removeNotify = (req, res) => {
    const {
        id
    } = req.query;

    Notify.find({_id: id}).then((result, err) => {
        if (err) {
            res.status(500).json({
                code: Message.FAILED,
                error: Message.SYSTEM_ERROR
            });
        }
        Notify.remove(result[0]).then(removeResult => {
            logger.error(`error ${JSON.stringify(removeResult)}`);
            res.json({
                code: Message.SUCCESS,
                data: removeResult
            });
        });
    }).catch(err=> {
        logger.error(`ERROR remove ${err}`);
        res.status(500).json({
            code: Message.FAILED,
            error: Message.SYSTEM_ERROR
        });
    })
};

export default removeNotify;