import appRoot from "app-root-path";
import path from "path";
import winston from "winston";


const PROJECT_ROOT = path.join(__dirname, '..');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },

};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.colorize({ all: true }),
        winston.format.simple()
    ),
    exitOnError: false,
});

logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    },
};

export default logger;