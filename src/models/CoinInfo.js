import { baseCoinHuobi, beautifulHuobiCoinName, quoteCoinHuobi } from "../utils/stringUtils";
import HoubiUtils from "../utils/huobiUtils";


export default class CoinInfo {
    constructor(symbol) {
        if (symbol) {
            const coinInfo = HoubiUtils.getCoinInfo(symbol.toLowerCase());
            this.name = beautifulHuobiCoinName(coinInfo);
            this.symbol = symbol;
            this.quoteCurrency = quoteCoinHuobi(coinInfo);
            this.baseCurrency = baseCoinHuobi(coinInfo);
        }
    }
}