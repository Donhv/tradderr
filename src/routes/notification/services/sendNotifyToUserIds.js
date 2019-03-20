import axios from "axios";
import logger from "../../../config/winston";
import properties from "../../../config/properties";
import NotifyUserInfo from "../../../models/notifyUserInfo";

const sendNotifyToUserIds = (emails, content, payloadData) => {
	if (emails && emails.length > 0) {
		logger.info(`start send notification to emails with message: =${JSON.stringify(emails)}, with content=${content}`);
		const onesignalUrl = `${properties.get("onesignal.url")}`;
		const onesignalAppId = `${properties.get("onesignal.appId")}`;
		const onesignalRestKey = `${properties.get("onesignal.restKey")}`;


		NotifyUserInfo.find({ "email": { $in: emails } }).then((result, err) => {
			if (err) {
				// res.status(500).json({
				//   code: Message.FAILED,
				//   error: Message.SYSTEM_ERROR
				// });
			} else {
				let listPlayerIds = [];
				listPlayerIds = [];

				result.forEach(item => {
					listPlayerIds.push(item.notiPlayerId);
				});

				const postData = {
					"app_id": onesignalAppId,
					"include_player_ids": listPlayerIds,
					"data": payloadData,
					"contents": { "en": content }
				};

				const axiosConfig = {
					headers: {
						"Content-Type": "application/json;charset=UTF-8",
						"Authorization": `Basic, ${onesignalRestKey}!`
					}
				};

				logger.info(`start send to url ${onesignalUrl}, with body ${JSON.stringify(postData)}`);
				axios.post(onesignalUrl, postData, axiosConfig)
					.then((res) => {
						if (res.status === 200) {
							console.log("RESPONSE SUCCESS");
						}
					})
					.catch((errorAxios) => {
						console.log("AXIOS ERROR: ", errorAxios);
					});
			}
		});
	}
};

export default sendNotifyToUserIds;