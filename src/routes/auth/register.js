import sendOtpEmail from "../../utils/mailgun";
import parseErrors from "../../utils/parseErrors";
import Message from "../../utils/message";
import User from "../../models/User";
import logger from "../../config/winston";


const register = (req, res) => {
    logger.info("register body json: ", req.body.user);
    const {
        email,
        password
    } = req.body.user;

    const user = new User({ email });

    User.findOne({
        email
    }).then((result) => {
        const existsAndNotConfirmed = result && !result.confirmOtp;
        if (existsAndNotConfirmed) {
            User.remove({ email: result.email }).then(err => {
                if (err) {
                    throw err;
                }
                return Promise.resolve(user);
            });
        }
        const accountValid = !result;
        if (accountValid) {
            return Promise.resolve();
        }

        const existsAccountError = {
            error: {
                error: { message: Message.EMAIL_ALREADY_TAKEN }
            }
        };
        throw existsAccountError;
    }).then(() => {
        user.generateOTP();
        user.setPassword(password);
        user.setToken();
        user.save().then((userRecord) => {
            sendOtpEmail(userRecord);
            res.json({
                code: Message.OTP_REQUIRED,
                data: userRecord.toAuth()
            });
        });
    }).catch(error => {
        res.status(500).json({
            code: Message.FAILED,
            error: parseErrors(error.errors)
        });
    });
};

export default register;