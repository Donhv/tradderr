import logger from "../../config/winston";
import getAllCoin from "../favorite/services/getAllFavorite";
import Message from "../../utils/message";
import Favorite from "../../models/Favorite";
import jwt from "jsonwebtoken";
import properties from "../../config/properties";

const searchCoin = (req, res) => {
	const {
		q
	} = req.query;
	const { token } = req.headers;
	const decoded = jwt.verify(token, properties.get("JWT_SECRET"));
	const { email } = decoded;
	logger.info(`search data with q=${q}`);
	Favorite.find({ email }).then((result) => {
		const listCoin = result.map(a => a.coin);
		return Promise.resolve(listCoin);
	}).then(favs => {
		getAllCoin().then(coins => {
			let result = [];
			if (q) {
				result = coins
					.map(a => {
						const isFav = favs.includes(a.symbol);
						return { ...a, favorite:  isFav};
					})
					.filter(a => (a.symbol.toLowerCase().includes(q.toLowerCase()) || a.name.toLowerCase().includes(q.toLowerCase())));
			} else {
				result = coins.map(a => {
					const isFav = favs.includes(a.symbol);
					return { ...a, favorite:  isFav};
				});
			}

			res.status(200).json({
				code: Message.SUCCESS,
				data: result
			});
		}).catch((err) => Promise.reject(err));
	}).catch(err => {
		logger.error(err);
		res.status(500).json({
			code: Message.FAILED,
			message: Message.SYSTEM_ERROR
		});
	});
};

export default searchCoin;