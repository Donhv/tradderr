import _ from "lodash";

import huobiSymbol from '../resources/huobi_symbol';

const mapHuobi = _.keyBy(huobiSymbol, "symbol");

const HoubiUtils = {
    getCoinInfo: (symbol) => mapHuobi[symbol.toLowerCase()]
};

Object.freeze(HoubiUtils);
export default HoubiUtils;