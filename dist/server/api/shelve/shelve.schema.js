"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const shelveTypeDefs = (0, apollo_server_express_1.gql) `
  type Shelve {
    _id: ID!
    user_id: ID!
    book_id: ID!
    status: String!
    ratings: [Rating]!
    average_rating: Float
  }

  type Rating {
    _id: ID!
    user_id: ID!
    stars: String!
    comment: String!
  }


  input ShelveInput {
    book_id: ID!
    status: String!
  }

  type Query {
    shelves: [Shelve]!
    shelveByStatus(status: String!): [Shelve]!
  }

  type Mutation {
    createShelve(shelve: ShelveInput!): Shelve!
    updateShelve(id: ID!, shelve: ShelveInput!): Shelve!
    deleteShelve(id: ID!): Shelve!
  }
`;
exports.default = shelveTypeDefs;
