"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = require("../configuration/connection");
const authorization = (context) => {
    const token = getTokenFromHeader(context);
    if (!token) {
        throw new Error("No token provided");
    }
    try {
        const secret = connection_1.jwtSecret;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
exports.authorization = authorization;
const getTokenFromHeader = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
        return authHeader.split(" ")[1];
    }
    return null;
};
module.exports = { authorization: exports.authorization };
