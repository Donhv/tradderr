import express from "express";
import searchCoin from "./searchCoin";

const router = express.Router();

router.get("/search", searchCoin);

export default router;