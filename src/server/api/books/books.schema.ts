import { gql } from 'apollo-server-express';

const booksTypeDefs = gql`

  type Book {
    _id: ID!
    title: String!
    author: String!
    date: String!
    cover_Image: String!
  }

  input BookInput {
    title: String!
    author: String!
    cover_Image: String!
  }


  type Query {
    book(id: ID!): Book!
    books: [Book]!
  }

  type Mutation {
    createBook(book: BookInput!): Book!
    updateBook(id: ID!, book: BookInput!): Book!
    deleteBook(id: ID!): Book!
  }
`;

export default booksTypeDefs;