import jwt from "jsonwebtoken";
import Message from "../../utils/message";
import User from "../../models/User";
import logger from "../../config/winston";
import properties from "../../config/properties";


const verifyOtp = (req, res) => {
    logger.info("verify otp: ", req.body);
    const {
        email,
        token,
        otp
    } = req.body;

    if (token) {
        jwt.verify(token, properties.get("JWT_SECRET"), (tokenErr, decoded) => {
            if (tokenErr) {
                res.status(401).json({
                    code: Message.FAILED,
                    message: Message.OTP_TOKEN_EXPIRED
                });
            } else {
                User.findOne({
                    email,
                    tokenOtp: token
                }).then((result) => {
                    logger.info("find result: ", result);

                    if (result == null) {
                        res.status(401).json({
                            code: Message.OTP_NOT_MATCH,
                            message: Message.OTP_NOT_MATCH_MESSAGE
                        });
                    }

                    if (otp !== result.otp) {
                        res.status(401).json({
                            code: Message.OTP_NOT_MATCH,
                            message: Message.OTP_NOT_MATCH_MESSAGE
                        });
                    } else {
                        User.findOneAndUpdate(
                            {
                                email: result.email,
                                token: result.token
                            },
                            {
                                confirmOtp: true,
                                otp: null,
                                token: result.generateToken()
                            }, {
                                new: true
                            }
                            , (err, doc) => {
                                if (err) {
                                    const emailNotFound = {
                                        error: { message: Message.EMAIL_NOT_FOUND }
                                    };
                                    throw emailNotFound;
                                } else {
                                    logger.info(doc);
                                    res.status(200).json({
                                        code: Message.SUCCESS,
                                        data: doc.toAuth()
                                    });
                                }
                            });
                    }
                }).catch(error => {
                    logger.error(error.message);
                    res.status(401).json({
                        code: Message.FAILED,
                        error: Message.EMAIL_NOT_FOUND
                    });
                });
            }
        });
    } else {
        res.status(401).json({
            code: Message.FAILED,
            message: Message.OTP_TOKEN_REQUIRED
        });
    }
};

export default verifyOtp;