import jwt from "jsonwebtoken";
import Message from "../../utils/message";
import Notify from "../../models/Notify";
import properties from "../../config/properties";

const getNotify = (req, res) => {
    const { token } = req.headers;
    try {
        const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
        const { email } = decoded;
        Notify.find({email}).then((result, err) => {
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
        }).catch(err => {
            throw err;
        });
    } catch (err) {
        res.status(401).json({
            code: Message.FAILED,
            message: Message.INVALID_TOKEN
        });
    }
};

export default getNotify;