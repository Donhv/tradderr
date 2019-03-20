import axios from "axios";
import logger from "../../../config/winston";
import properties from "../../../config/properties";


const getAllSymbols = () => {
	const url = `${properties.get("huobi.url")}/v1/common/symbols`;
	logger.info("URL request", url);
	return axios.get(url).then(response => {
		const list  = response.data.data;
		const symbols = list.map(a=> a.symbol);
		return Promise.resolve(symbols);
	});
};

export default getAllSymbols;