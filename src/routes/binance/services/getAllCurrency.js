import axios from "axios";
import logger from "../../../config/winston";
import properties from "../../../config/properties";


const getAllSymbols = () => {
	const url = `${properties.get("binance.url")}/v3/ticker/price`;
	logger.info("URL request", url);
	return axios.get(url).then(response => {
		const list = response.data;
		const symbols = list.map(a => a.symbol);
		return Promise.resolve(symbols);
	});
};

export default getAllSymbols;