import { formatDatetime } from "../../utils/datetimeUtils";

export default class RowTrade {
    constructor() {
        this.type = null;
        this.date = null;
        this.rate = 0;
        this.quantity = 0;
    }

    fromHuobi(json) {
        this.type = json.direction;
        this.date = formatDatetime(new Date(json.ts));
        this.rate = json.price;
        this.quantity = json.amount;
    }

    fromBittrex(json) {
        this.type = json.OrderType.toLowerCase();
        this.date = formatDatetime(new Date());
        this.rate = json.Price;
        this.quantity = json.Quantity;
    }

    fromBittrexOrderBook(json, type) {
        this.type = type.toLowerCase();
        this.date = formatDatetime(new Date());
        this.rate = json.Rate;
        this.quantity = json.Quantity;
    }

    fromBinance(json) {
        if (json.isBuyerMaker)
            this.type = 'buy';
        else
            this.type = 'sell';

        this.date = formatDatetime(new Date(json.time));
        this.rate = json.price;
        this.quantity = json.qty;
    }
}