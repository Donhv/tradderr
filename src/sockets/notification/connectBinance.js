import binance from "binance";
import logger from "../../config/winston";
import setNotifyStatus from "../../routes/notification/services/updateStatusNotify";
import sendNotifyToUserIds from "../../routes/notification/services/sendNotifyToUserIds";
import Notify from "../../models/Notify";
import getAllSymbols from "../../routes/binance/services/getAllCurrency";

const handleData = (data, notifies) => {
	const emails = [];
	const { symbol } = data;
	notifies.forEach(notify => {
		// logger.info(`DETAIL notify ${JSON.stringify(notify)}`);
		if (symbol === notify.symbol && notify.thresholdType === "LESS_THAN" && data.currentClose <= notify.threshold) {
			logger.info(`LESSS------------THAN ${data.currentClose} <= ${notify.threshold} `);
			emails.push(notify.email);
			setNotifyStatus(notify._id, "EXPIRED");
		}

		if (symbol === notify.symbol && notify.thresholdType === "MORE_THAN" && data.currentClose >= notify.threshold) {
			logger.info(`MORE------------THAN ${data.currentClose} >= ${notify.threshold} `);
			emails.push(notify.email);
			setNotifyStatus(notify._id, "EXPIRED");
		}
	});
	sendNotifyToUserIds(emails,
		`Binance ${symbol} is ${data.currentClose}`,
		{ type: "MATCHED_PRICE", "coinName": symbol, "market": "binance" });
};

const init = () => {
	const binanceWS = new binance.BinanceWS(true);
		getAllSymbols().then(symbols => {
			logger.info(`BINANCE SUBCRIBE ${symbols.length} coin`);
			// logger.info(`BINANCE notifies ${JSON.stringify(symbols)}`);
			symbols.forEach(notify => {
				binanceWS.onTicker(notify, (data) => {
					Notify.find({ status: "PENDING", exchange: "binance" }).then(notifies => {
						handleData(data, notifies);
					}).catch(err=> {
						logger.error("Binance get notify error ", err);
					});
				});
			});
		}).catch(err=> {
			logger.info(`Error get all symbols of binance ${err}`);
		})

};

export default init;
