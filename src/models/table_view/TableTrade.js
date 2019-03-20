import Constants from "../../utils/constants";

export default class TableTrade {
    constructor() {
        this.title = "";
        this.coinInfo = null;
        this.header = {
            type: Constants.TABLE_HEADER_TYPE,
            date: Constants.TABLE_HEADER_DATE,
            rate: Constants.TABLE_HEADER_PRICE,
            quantity: Constants.TABLE_HEADER_QUANTITY
        };
        this.rows = null;
    }
}