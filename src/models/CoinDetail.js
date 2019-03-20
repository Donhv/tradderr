import { hashString } from "../utils/stringUtils";
import { convertToMillion, convertToPercent } from "../utils/numberUtils";

export default class CoinDetail {
    constructor() {
        this.id = 0;
        this.rank = null;
        this.name = "";
        this.symbol = "";
        this.baseCurrency = "";
        this.quoteCurrency = "";
        this.price = 0;
        this.priceValue = 0;
        this.market = 0;
        this.marketValue = 0;
        this.vol24h = 0;
        this.vol24hValue = 0;
        this.high = 0;
        this.highValue = 0;
        this.low = 0;
        this.lowValue = 0;
        this.image = null;
        this.change = 0;
        this.changeValue = 0;
        this.increase = null;
        this.favorite = false;
        this.exchange = null;
    }

    fromCoinMarketCap(json, convert) {
        const currency = convert == null ? "USD" : convert;
        this.id = json.id;
        this.name = json.name;
        this.rank = json.rank;
        this.symbol = json.symbol;
        this.baseCurrency = json.symbol;
        this.quoteCurrency = currency;
        this.price = convertToMillion(json.quotes[currency].price, 2);
        this.priceValue = json.quotes[currency].price;
        this.market = convertToMillion(json.quotes[currency].market_cap);
        this.marketValue = json.quotes[currency].market_cap;
        this.vol24h = convertToMillion(json.quotes[currency].volume_24h, 0);
        this.vol24hValue = json.quotes[currency].volume_24h;
        this.change = convertToPercent(json.quotes[currency].percent_change_24h, 2);
        this.changeValue = json.quotes[currency].percent_change_24h;
        this.increase = json.quotes[currency].percent_change_24h > 0;
        this.exchange = "Coinmarketcap";
    }

    fromHoubi(json) {
        this.id = hashString(json.symbol);
        this.symbol = json.symbol;
        this.price = convertToMillion(json.close, 2);
        this.priceValue = json.close;
        const percent = ((json.close - json.open) / json.open) * 100;
        this.increase = percent > 0;
        this.change = convertToPercent(percent, 2);
        this.changeValue = percent;
        this.vol24h = convertToMillion(json.amount, 0);
        this.vol24hValue = json.amount;
        this.low = convertToMillion(json.low, 2);
        this.lowValue = json.low;
        this.high = convertToMillion(json.high, 2);
        this.highValue = json.high;
        this.exchange = "Huobi";
    }

    fromBittrex(json) {
        this.id = hashString(json.Summary.MarketName);
        this.name = `${json.Market.MarketCurrency}/${json.Market.BaseCurrency}`;
        this.symbol = json.Summary.MarketName;
        this.quoteCurrency = json.Market.BaseCurrency;
        this.baseCurrency = json.Market.MarketCurrency;
        this.price = convertToMillion(json.Summary.Last,2);
        this.priceValue = json.Summary.Last;
        const percent = ((json.Summary.Last - json.Summary.PrevDay) / json.Summary.PrevDay)*100;
        this.increase = percent > 0;
        this.change =convertToPercent(percent, 2);
        this.changeValue = percent;
        this.vol24h = convertToMillion(json.Summary.BaseVolume, 0);
        this.vol24hValue = json.Summary.BaseVolume;
        this.low = convertToMillion(json.Summary.Low,2);
        this.lowValue = json.Summary.Low;
        this.high = convertToMillion(json.Summary.High,2);
        this.highValue = json.Summary.High;
        this.exchange = "Bittrex";
    }

    fromBittrexDetail(json) {
        this.id = hashString(json.MarketName);
        this.name = json.MarketName;
        this.symbol = json.MarketName;
        this.price = convertToMillion(json.Last,2);
        this.priceValue = json.Last;
        const percent = ((json.Last - json.PrevDay) / json.PrevDay)*100;
        this.increase = percent > 0;
        this.change =convertToPercent(percent, 2);
        this.changeValue =percent;
        this.vol24h = convertToMillion(json.BaseVolume, 0);
        this.vol24hValue = json.BaseVolume;
        this.low = convertToMillion(json.Low,2);
        this.lowValue = json.Low;
        this.high = convertToMillion(json.High,2);
        this.highValue = json.High;
        this.exchange = "Bittrex";
    }

    fromBinance(json) {
        this.id = hashString(json.symbol);
        this.name = json.symbol;
        this.symbol = json.symbol;
        this.price = convertToMillion(json.lastPrice, 2);
        this.priceValue = parseFloat(json.lastPrice);
        const percent = ((json.lastPrice - json.prevClosePrice) / json.prevClosePrice)*100;
        this.increase = percent > 0;
        this.change =convertToPercent(percent, 2);
        this.changeValue =percent;
        this.vol24h = convertToMillion(json.quoteVolume, 0);
        this.vol24hValue = json.quoteVolume;
        this.low = convertToMillion(json.lowPrice, 2);
        this.lowValue = json.lowPrice;
        this.high = convertToMillion(json.highPrice, 2);
        this.highValue = json.highPrice;
        this.exchange = "Binance";
    }
}