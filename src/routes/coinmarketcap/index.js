import express from "express";

import ticker from "./ticker";
import global from "./global";
import tickers from "./tickers";

const router = express.Router();

router.get("/ticker", tickers);
router.get("/ticker/:id", ticker);
router.get("/global", global);

export default router;