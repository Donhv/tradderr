import express from "express";
import tickers from "./tickers";
import kline from "./kline";
import history from "./history";
import trade from "./trade";
import coinDetail from "./coinDetail";
import summary from "./summary";

const router = express.Router();

router.get("/market/tickers", tickers);
router.get("/history/kline", kline);
router.get("/market/history/trade", history);
router.get("/market/trade", trade);
router.get("/market/detail", coinDetail);
router.get("/market/summary", summary);

export default router;