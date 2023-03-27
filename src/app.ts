import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { mongoDBUrl } from "./configuration/connection";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));

import userTypeDefs from "./server/api/user/user.schema";
import userResolver from "./server/api/user/user.resolvers";
import booksTypeDefs from "./server/api/books/books.schema";
import bookResolver from "./server/api/books/books.resolver";
import shelveTypeDefs from "./server/api/shelve/shelve.schema";
import shelveResolver from "./server/api/shelve/shelve.resolver";
import ratingTypeDefs from "./server/api/rating/rating.schema";
import ratingResolver from "./server/api/rating/rating.resolver";

const typeDefs = mergeTypeDefs([
  userTypeDefs,
  booksTypeDefs,
  shelveTypeDefs,
  ratingTypeDefs,
]);
const resolvers = mergeResolvers([
  userResolver,
  bookResolver,
  shelveResolver,
  ratingResolver,
]);
mongoose
  .connect(mongoDBUrl, {})
  .then(() => console.log("Database Connection Sucessfull"))
  .catch((err) => console.log(err));

new ApolloServer({
  typeDefs,
  resolvers,
}).listen(3000, () => {
  console.log("GraphQl Server is listening on Port 3000");
});

app.listen(4852, () => {
  console.log("Image Loader Server is listening on Port 4852");
});
