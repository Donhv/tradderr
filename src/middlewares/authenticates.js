import jwt from "jsonwebtoken";
import express from "express";
import logger from "../config/winston";
import Message from "../utils/message";
import User from "../models/User";
import properties from "../config/properties";


const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.token;
    logger.info("Validating token....", token);
    if (req.originalUrl.includes("coinmarketcap")) {
        next();
    }
    if (token) {
        jwt.verify(token, properties.get("JWT_SECRET"), (err, decoded) => {
            if (err) {
                res.status(401).json({
                    code: Message.FAILED,
                    message: Message.INVALID_TOKEN
                });
            } else {
                User.findOne({
                    email: decoded.email
                }).then(user => {
                    req.currentUser = user;
                    next();
                });
            }
        });
    } else {
        res.status(401).send({
            success: Message.FAILED,
            message: Message.INVALID_TOKEN
        });
    }
};

router.use(authenticate);

export default router;