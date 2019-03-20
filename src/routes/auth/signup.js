import User from "../../models/User";
import logger from "../../config/winston";
import Message from "../../utils/message";
import sendOtpEmail from "../../utils/mailgun";

const signUp = (req, res) => {
    logger.info("register body json: ", req.body.user);
    const {
        email
    } = req.body.user;

    const user = new User({ email });

    User.findOne({
        email
    }).then(result => {
        if (result) {
            return User.findOneAndUpdate(
                {
                    email: result.email
                },
                {
                    otp: Math.floor((Math.random() * 899999) + 100000),
                    tokenOtp: result.generateTokenOTP()
                }, {
                    new: true
                });
        }
        user.generateOTP();
        user.setPassword("123456a@");
        user.setTokenOtp();
        return user.save();
    }).then(userRecord => {
        sendOtpEmail(userRecord);
        res.json({
            code: Message.OTP_REQUIRED,
            data: userRecord.otpInfo()
        });
    }).catch(error => {
        res.status(500).json({
            code: Message.FAILED,
            error: error.message
        });
    });

};

export default signUp;