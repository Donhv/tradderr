import moment from "moment";
import { fromTimestampToBeautifulDate } from "../../utils/datetimeUtils";

export default class CandleItem {
    constructor() {
        this.id = null;
        this.displayDate = null;
        this.timeMillis = null;
        this.open = null;
        this.high = null;
        this.low = null;
        this.close = null;
        this.amount = null;
        this.vol24h = null;
        this.count = null;
    }

    fromHuobi(tick, cycle) {
        this.id = tick.id;
        this.displayDate = fromTimestampToBeautifulDate(tick.id*1000, cycle);
        this.timeMillis = tick.id*1000;
        this.open = tick.open;
        this.high = tick.high;
        this.low = tick.low;
        this.close = tick.close;
        this.amount = tick.amount;
        this.vol24h = tick.vol24h;
        this.count = tick.count;
    }

    fromBittrex(tick, cycle) {
        this.timeMillis = moment(tick.T, "YYYY-MM-DDTHH:mm:ss").valueOf();
        this.displayDate = fromTimestampToBeautifulDate(this.timeMillis, cycle);
        this.open = tick.O;
        this.high = tick.H;
        this.low = tick.L;
        this.close = tick.C;
        this.vol24h = tick.V;
    }

    fromBinance(tick, cycle) {
        [this.timeMillis, this.open, this.high, this.low, this.close, this.vol24h] = tick;
        this.timeMillis = parseFloat(this.timeMillis);
        this.open = parseFloat(this.open);
        this.high = parseFloat(this.high);
        this.low = parseFloat(this.low);
        this.close = parseFloat(this.close);
        this.vol24h = parseFloat(this.vol24h);
        this.displayDate = fromTimestampToBeautifulDate(this.timeMillis, cycle);
    }
}