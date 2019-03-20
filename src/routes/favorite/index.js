import express from "express";
import addFavorite from "./addFavorite";
import getFavorite from "./getFavorite";
import removeFavorite from "./removeFavorite";

const router = express.Router();

router.post("/add", addFavorite);
router.get("/all", getFavorite);
router.post("/remove", removeFavorite);

export default router;