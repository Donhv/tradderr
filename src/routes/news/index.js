import express from "express";
import news from "./news";

const router = express.Router();

router.get("/news", news);

export default router;