import Mailgun from "mailgun-js";
import logger from "../config/winston";
import properties from "../config/properties";

const from = properties.get("mailgun.from");

const mailgunOptions = {
    apiKey: properties.get("mailgun.apiKey"),
    domain: properties.get("mailgun.domain")
};

export default function sendOtpEmail(userRecord) {
    logger.info(`apiKey = ${mailgunOptions.apiKey}  domain = ${mailgunOptions.domain}`);
    const transport = new Mailgun(mailgunOptions);
    const email = {
        from,
        to: userRecord.email,
        subject: "Welcome to Trader App",
        text: `
            Welcome to Trader App. Your OTP is:

            ${userRecord.getOTP()}
        `
    };
    logger.info(email);
    transport.messages().send(email, (err, body) => {
        if (err) {
            logger.error(err.message);
        }
        logger.info(`Send mail successful! to ${body}`)
    });
}