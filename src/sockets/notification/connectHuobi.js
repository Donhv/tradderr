import WebSocket from "ws";
import pako from "pako";
import logger from "../../config/winston";
import sendNotifyToUserIds from "../../routes/notification/services/sendNotifyToUserIds";
import setNotifyStatus from "../../routes/notification/services/updateStatusNotify";
import Notify from "../../models/Notify";
import getAllSymbols from "../../routes/huobi/services/getAllCurrency";

const WS_URL = "wss://api.huobi.pro/ws";

function handle(data, notifies) {
	const channel = data.ch.split(".")[2];
	const symbol = data.ch.split(".")[1];
	switch (channel) {
		case "depth":
			break;
		case "kline":
			logger.info("HUOBI Kline", data.tick);
			break;
		case "detail":
			// logger.info("HUOBI Detail", data);
			const emails = [];
			notifies.forEach(notify => {
				// logger.info(`HUOBI DETAIL notify ${JSON.stringify(notify)}`);
				if (symbol === notify.symbol && notify.thresholdType === "LESS_THAN" && data.tick.close <= notify.threshold) {
					logger.info(`LESSS------------THAN ${data.tick.close} <= ${notify.threshold} `);
					emails.push(notify.email);
					setNotifyStatus(notify._id, "EXPIRED");
				}

				if (symbol === notify.symbol && notify.thresholdType === "MORE_THAN" && data.tick.close >= notify.threshold) {
					logger.info(`MORE------------THAN ${data.tick.close} >= ${notify.threshold} `);
					emails.push(notify.email);
					setNotifyStatus(notify._id, "EXPIRED");
				}
			});
			if (emails.length > 0) {
				sendNotifyToUserIds(emails,
					`Huobi ${symbol} is ${data.tick.close}`,
					{ type: "MATCHED_PRICE", "coinName": symbol, "market": "huobi" });
			}
			break;
		default:
			break;
	}
}

const subscribe = (ws) => {
	getAllSymbols().then(symbols => {
		logger.info(`HOUBI SUBCRIBE ${symbols.length} coin`);
		symbols.forEach(symbol => {
			const req = JSON.stringify({
				"sub": `market.${symbol}.detail`,
				"id": `${symbol}`
			});
			ws.send(req);
		});
	});
};

function init() {
	const ws = new WebSocket(WS_URL);
	ws.on("open", () => {
		logger.info("open huobi");
		// setInterval(()=>subscribe(ws), 3000);
		subscribe(ws);
	});
	ws.on("message", (data) => {
		const text = pako.inflate(data, {
			to: "string"
		});
		const msg = JSON.parse(text);
		if (msg.ping) {
			ws.send(JSON.stringify({
				pong: msg.ping
			}));
		}
		if (msg.tick) {
			Notify.find({ status: "PENDING", exchange: "huobi" }).then(notifies => {
				handle(msg, notifies);
			});
		}
	});
	ws.on("close", () => {
		logger.info("close huobi");
		init();
	});
	ws.on("error", err => {
		logger.info("error huobi", err);
		init();
	});
}

export default init;
