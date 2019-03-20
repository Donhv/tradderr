import News from "../../models/News";
import Message from "../../utils/message";

const news = (req, res) => {
    News.find({}).then((result, err) => {
        if (err) {
            res.status(500).json({
                code: Message.FAILED,
                error: Message.SYSTEM_ERROR
            });
        }
        res.json({
            code: Message.SUCCESS,
            data: result
        });
    })
};

export default news;