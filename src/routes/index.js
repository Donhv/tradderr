import auth from "./auth";
import binance from "./binance";
import coin from "./coin";
import huobi from "./huobi";
import bittrex from "./bittrex";
import news from "./news";
import coinmarketcap from "./coinmarketcap";
import favorite from "./favorite";
import search from "./search";
import notification from "./notification";

const router = {
    auth,
    bittrex,
    binance,
    coin,
    huobi,
    news,
    coinmarketcap,
    favorite,
    search,
    notification
};

export default router;