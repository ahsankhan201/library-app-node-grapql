import { gql } from "apollo-server-express";

const shelveTypeDefs = gql`
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

export default shelveTypeDefs;
