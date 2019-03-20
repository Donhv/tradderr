import huobi from "./huobi";
import bittrex from "./bittrex";
import logger from "../config/winston";

const combineSocket = (socket) => {
    huobi.tickers(socket);
    bittrex.tickers(socket);
    // binance.tickers(socket);
};

const socketTrading = socket => {
    logger.info("New client connected");
	setInterval(() => combineSocket(socket), 2000);
    socket.on("disconnect", () => logger.info("Client disconnected"));
};

export default socketTrading;