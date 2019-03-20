import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import Message from "../utils/message";
import properties from "../config/properties";

const schema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        index: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    confirmOtp: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: ""
    },
    tokenOtp: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
});

schema.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.generateOTP = function  generateOTP() {
    this.otp = Math.floor((Math.random() * 899999) + 100000);
};

schema.methods.getOTP = function getOTP() {
    return this.otp;
};

schema.methods.setToken = function setToken() {
    this.token = this.generateToken();
};

schema.methods.setTokenOtp = function setToken() {
    this.token = this.generateTokenOTP();
};


schema.methods.generateToken = function generateToken() {
    return jwt.sign({
        email: this.email,
        timestamp: new Date().getMilliseconds()
    }, properties.get("JWT_SECRET"));
};

const expiresIn = { expiresIn: 60*5 };
schema.methods.generateTokenOTP = function generateTokenOTP() {
    return jwt.sign({
        email: this.email
    }, properties.get("JWT_SECRET"), expiresIn);
};

schema.methods.validateOtp = function validateOtp(otp) {
    return this.otp === otp;
};

schema.methods.toAuth = function toAuth() {
    return {
        email: this.email,
        token: this.token
    };
};

schema.methods.otpInfo = function toAuth() {
    return {
        email: this.email,
        token: this.tokenOtp
    };
};

schema.plugin(uniqueValidator, {message: Message.EMAIL_ALREADY_TAKEN});

export default mongoose.model('User', schema)