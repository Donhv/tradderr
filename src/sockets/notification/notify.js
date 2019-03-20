import huobiNotify from "./connectHuobi";
import binanceNotify from "./connectBinance";
import bittrexNotify from "./connectBittrex";

const notifyProcess = () => {
	huobiNotify();
	binanceNotify();
	bittrexNotify();
};

export default notifyProcess;
