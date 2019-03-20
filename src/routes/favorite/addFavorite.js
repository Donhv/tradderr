import jwt from "jsonwebtoken";

import Favorite from "../../models/Favorite";
import Message from "../../utils/message";
import logger from "../../config/winston";
import properties from "../../config/properties";

const addFavorite = (req, res) => {
	const { token } = req.headers;
	const { exchange, coin } = req.body;

	logger.info(`token=${token}`);
	logger.info(`exchange=${exchange}`);
	logger.info(`coin=${coin}`);

	if (!exchange || !coin) {
		res.status(500).json({
			code: Message.FAILED,
			message: "Param invalid"
		});
	}

	try {
		const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
		const { email } = decoded;

		const favorite = new Favorite({ email, exchange, coin });
		Favorite.findOne({ email, exchange, coin }).then((result) => {
			if (result) {
				return Promise.reject();
			}
			return Promise.resolve();
		}).then(() => {
			favorite.save().then((favoriteResult) => {
				res.status(200).json({
					code: Message.SUCCESS,
					data: favoriteResult.toJson()
				});
			});
		}).catch(err => {
			logger.error(err);
			res.status(500).json({
				code: Message.FAILED,
				message: Message.FAVORITE_EXISTS
			});
		});

	} catch (err) {
		res.status(401).json({
			code: Message.FAILED,
			message: Message.INVALID_TOKEN
		});
	}
};

export default addFavorite;