"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = require("../configuration/connection");
const apollo_server_express_1 = require("apollo-server-express");
const authorization = (context) => {
    if (context.req.headers.authorization &&
        context.req.headers.authorization.startsWith("Bearer")) {
        const token = context.req.headers.authorization;
        if (!token) {
            throw new apollo_server_express_1.UserInputError("No Token Found");
        }
        const decoded = jsonwebtoken_1.default.verify(token, connection_1.jwtSecret);
        return decoded;
    }
    else {
        throw new apollo_server_express_1.ApolloError("Invalid token");
    }
};
module.exports = { authorization };
