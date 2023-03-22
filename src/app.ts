import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import userTypeDefs from "./server/api/user/user.schema";
import userResolver from "./server/api/user/user.resolvers";
import booksTypeDefs from "./server/api/books/books.schema";
import bookResolver from "./server/api/books/books.resolver";
import { mongoDBUrl } from "./configuration/connection";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
const typeDefs = mergeTypeDefs([userTypeDefs, booksTypeDefs]);  
const resolvers = mergeResolvers([userResolver, bookResolver]);
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
