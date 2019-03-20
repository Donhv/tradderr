import Message from "../../utils/message";
import User from "../../models/User";
import logger from "../../config/winston";

const login = (req, res) => {
    logger.info("Login request body: ", req.body);
    const {
        user
    } = req.body;

    User.findOne({
        email: user.email
    }).then(result => {
        if (result && result.isValidPassword(user.password)) {
            res.json({
                code: Message.SUCCESS,
                data: result.toAuth()
            });
        } else {
            res.status(400).json({
                code: Message.FAILED,
                error: {
                    message: Message.INVALID_CREDENTICALS
                }
            });
        }
    });
};

export default login;