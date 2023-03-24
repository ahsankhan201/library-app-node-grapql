"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = __importDefault(require("./server/api/user/user.schema"));
const user_resolvers_1 = __importDefault(require("./server/api/user/user.resolvers"));
const books_schema_1 = __importDefault(require("./server/api/books/books.schema"));
const books_resolver_1 = __importDefault(require("./server/api/books/books.resolver"));
const connection_1 = require("./configuration/connection");
const merge_1 = require("@graphql-tools/merge");
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
const typeDefs = (0, merge_1.mergeTypeDefs)([user_schema_1.default, books_schema_1.default]);
const resolvers = (0, merge_1.mergeResolvers)([user_resolvers_1.default, books_resolver_1.default]);
mongoose_1.default
    .connect(connection_1.mongoDBUrl, {})
    .then(() => console.log("Mongo Database Connected..."))
    .catch((err) => console.log(err));
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
});
server.listen(3000, () => {
    console.log("Server listening on http://localhost:3000/graphql");
});
app.listen(4243, () => {
    console.log("Server listening on http://localhost:4243");
});
