import express from "express";
import registerNotifyPlayerId from './registerNotifyPlayerId';
import addNotify from "./addNotify";
import getNotify from "./getNotify";
import editNotify from "./editNotify";
import removeNotify from "./removeNotify";

const router = express.Router();

router.post("/register-playerId", registerNotifyPlayerId);
router.post("/add", addNotify);
router.post("/edit", editNotify);
router.get("/all", getNotify);
router.get("/delete", removeNotify);

export default router;