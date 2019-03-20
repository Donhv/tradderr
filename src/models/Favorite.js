import mongoose from "mongoose";

const schema = mongoose.Schema({
        email: {
            type: String,
            lowercase: true,
            require: true
        },
        exchange: {
            type: String,
            require: true
        },
        coin: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    });

schema.methods.setEmail = function setEmail(email) {
    this.email = email;
};

schema.methods.setExchange = function setExchange(exchange) {
    this.exchange = exchange;
};

schema.methods.setCoin = function setCoin(coin) {
     this.coin = coin;
};

schema.methods.toJson = function toJson() {
    return {
        email: this.email,
        exchange: this.exchange,
        coin: this.coin
    };
};

export default mongoose.model("Favorite", schema);