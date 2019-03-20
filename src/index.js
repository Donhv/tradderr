import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Promise from "bluebird";
import morgan from "morgan";
import http from "http";
import cors from "cors";
import Socket from "socket.io";

import winston from "./config/winston";

import router from "./routes";
import authenMiddleware from "./middlewares/authenticates";
import socketApp from "./sockets";
import errorHandling from "./middlewares/errorHandling";

import notifyProcess from "./sockets/notification/notify";
/*
* CONFIG 
*/

dotenv.config();
const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(morgan("combined", {stream: winston.stream}));
app.use(cors());
/*
* CONFIG MONGODB
*/
mongoose.Promise = Promise;
const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            winston.info(`Connected to ${process.env.MONGODB_URL}`);
        })
        .catch(err => {
            winston.info(err);
            setTimeout(connectWithRetry, 2000);
        });
};
connectWithRetry();

/*
* CONFIG MIDDLEWARE
*/
// app.use(authenMiddleware);
app.use(errorHandling);

/*
 * CONFIG ROUTES
 */

app.use(`/${process.env.CONTEXT_PATH}/authen`, router.auth);
app.use(`/${process.env.CONTEXT_PATH}/coinmarketcapp`, router.coinmarketcap);
app.use(`/${process.env.CONTEXT_PATH}/huobi`, router.huobi);
app.use(`/${process.env.CONTEXT_PATH}/bittrex`, router.bittrex);
app.use(`/${process.env.CONTEXT_PATH}/binance`, router.binance);
app.use(`/${process.env.CONTEXT_PATH}/coin`, router.coin);
app.use(`/${process.env.CONTEXT_PATH}/`, router.news);
app.use(`/${process.env.CONTEXT_PATH}/favorite`, router.favorite);
app.use(`/${process.env.CONTEXT_PATH}/`, router.search);
app.use(`/${process.env.CONTEXT_PATH}/notification`, router.notification);
//
// app.get(`/${process.env.CONTEXT_PATH}/*`, (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

notifyProcess();

const server = http.createServer(app);


/*
 * SOCKET CONFIG
 */

const io = Socket(server);
// io.on("connection", socketApp);

server.listen(process.env.PORT, () => console.log(`Running from localhost:${process.env.PORT}`));
