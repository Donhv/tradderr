import properties from "../config/properties";

const Constants = {
    TABLE_HEADER_TITLE_TRADE: properties.get("table.title.trade"),
    TABLE_HEADER_TYPE: properties.get("table.header.type"),
    TABLE_HEADER_DATE: properties.get("table.header.date"),
    TABLE_HEADER_PRICE: properties.get("table.header.price"),
    TABLE_HEADER_QUANTITY: properties.get("table.header.quantity")
};

export default Constants;