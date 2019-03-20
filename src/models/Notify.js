import mongoose from "mongoose";
import Double from "mongoose-double";

const mg = Double(mongoose);
const SchemaTypes = mongoose.Schema.Types;
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
		name: {
			type: String
		},
		symbol: {
			type: String,
			require: true
		},
		thresholdType: {
			type: String,
			require: true
		},
		threshold: {
			type: SchemaTypes.Double,
			require: true
		},
		date: { type: Number, default: Date.now() },
		status: {
			type: String,
			require: true,
			default: "PENDING"
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

schema.methods.setSymbol = function setSymbol(symbol) {
	this.symbol = symbol;
};


schema.methods.setThreshold = function setThreshold(threshold) {
	this.threshold = threshold;
};

schema.methods.setThresholdType = function setThresholdType(thresholdType) {
	this.thresholdType = thresholdType;
};

schema.methods.setPending = function setThresholdType() {
	this.status = "PENDING";
};

schema.methods.setExpired = function setExpired() {
	this.status = "EXPIRED";
};


schema.methods.toJson = function toAuth() {
	return {
		id: this._id,
		email: this.email,
		exchange: this.exchange,
		symbol: this.symbol,
		name: this.name,
		thresholdType: this.thresholdType,
		threshold: this.threshold,
		createdDate: this.date
	};
};

export default mongoose.model("Notify", schema);