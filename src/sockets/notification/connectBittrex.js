import signalR from "signalr-client";
import jsonic from "jsonic";
import zlib from "zlib";
import logger from "../../config/winston";
import Notify from "../../models/Notify";
import setNotifyStatus from "../../routes/notification/services/updateStatusNotify";
import sendNotifyToUserIds from "../../routes/notification/services/sendNotifyToUserIds";


const client = new signalR.client(
	"wss://beta.bittrex.com/signalr",
	["c2"]
);

client.serviceHandlers.reconnecting = function () {
	return false; // Retry
}

client.serviceHandlers.onerror = () => {
	logger.error("Connect Bittrex error");
}

client.serviceHandlers.connected = (connection) => {
	logger.info("connected BITTREX");

	setInterval(() => {
		client.call("c2", "QuerySummaryState").done((err, result) => {
			if (err) {
				logger.error(`ERROR CONNECT BITTREX ${err}`);
			}
			if (result === true) {
				logger.info("Subscribed to QuerySummaryState");
			}
		});
	}, 2000);
};

client.serviceHandlers.messageReceived = (message) => {
	const data = jsonic(message.utf8Data);
	if (Object.prototype.hasOwnProperty.call(data, "R")) {
		const b64 = data.R;
		const raw = new Buffer.from(b64, "base64");
		zlib.inflateRaw(raw, (err, inflated) => {
			if (!err) {
				const json = JSON.parse(inflated.toString("utf8"));
				const listCoin = json.s;
				// logger.info(`BITTREX list result ${listCoin.length}`);
				Notify.find({ status: "PENDING", exchange: "bittrex" }).then(notifies => {
					// logger.info(JSON.stringify(notifies));
					listCoin.forEach(coin => {
						const emails = [];
						notifies.forEach(notify => {
							if (coin.M === notify.symbol && notify.thresholdType === "LESS_THAN" && coin.l <= notify.threshold) {
								logger.info(`LESSS------------THAN ${coin.l} <= ${notify.threshold} `);
								emails.push(notify.email);
								setNotifyStatus(notify._id, "EXPIRED");
							}

							if (coin.M === notify.symbol && notify.thresholdType === "MORE_THAN" && coin.l >= notify.threshold) {
								logger.info(`MORE------------THAN ${coin.l} >= ${notify.threshold} `);
								emails.push(notify.email);
								setNotifyStatus(notify._id, "EXPIRED");
							}
						});
						sendNotifyToUserIds(emails,
							`Bittrex ${coin.M} is ${coin.l}`,
							{ type: "MATCHED_PRICE", "coinName": coin.symbol, "market": "bittrex" });
					});

				}).catch(error => {
					logger.error(`ERROR WITH GET BITTREX NOTIFYY ${error}`);
				});
			}
		});
	}
};

function init() {
	client.start();
};

export default init;
