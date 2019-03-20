import path from "path";
import fs from "fs";

import logger from "../../config/winston";

const image = (req, res) => {
	try {
		logger.info("get images");
		const {
			currency
		} = req.query;
		logger.info(`currency= ${currency}`);
		const filePath = path.join(__dirname,
			`../../resources/currency_icon/128/color/${currency.toLowerCase()}.png`);
		res.sendFile(filePath);

		// fs.exists(filePath, (exists) => {
		// 	if (exists) {
		// 		res.sendFile(filePath);
		// 	}
		// 	filePath = path.join(__dirname,
		// 		`../../resources/currency_icon/128/color/default.png`);
		// 	res.sendFile(filePath);
		// })

	} catch (err) {
		logger.error(err);
	}
};

export default image;