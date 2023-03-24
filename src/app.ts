import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import userTypeDefs from "./server/api/user/user.schema";
import userResolver from "./server/api/user/user.resolvers";
import booksTypeDefs from "./server/api/books/books.schema";
import bookResolver from "./server/api/books/books.resolver";
import shelveTypeDefs from "./server/api/shelve/shelve.schema";
import shelveResolver from "./server/api/shelve/shelve.resolver";
import { mongoDBUrl } from "./configuration/connection";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));

const typeDefs = mergeTypeDefs([userTypeDefs, booksTypeDefs, shelveTypeDefs]);
const resolvers = mergeResolvers([userResolver, bookResolver, shelveResolver]);
mongoose
  .connect(mongoDBUrl, {})
  .then(() => console.log("Mongo Database Connected..."))
  .catch((err) => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/graphql");
});
app.listen(4243, () => {
  console.log("Server listening on http://localhost:4243");
});
