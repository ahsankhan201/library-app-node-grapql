import { UserInputError } from "apollo-server-express";
import Book from "./books";
import fs from "fs";
var path = require("path");
const bookResolver = {
  Query: {
    book: async (_: any, { id }: any) => {
      const book = await Book.findById(id);
      if (!book) {
        throw new UserInputError("Book not found");
      }
      return book;
    },
    books: async () => {
      return await Book.find();
    },
  },
  Mutation: {
    createBook: async (_: any, { book }: any, context: any) => {


      const base64Image = await book.cover_Image;
      if (!base64Image) {
        throw new UserInputError("Cover Image Required");
      }
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");
      const fileName = `${Date.now()}.png`;
      const directory = path.join(__dirname, "../../../../public/images");
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      fs.writeFileSync(path.join(directory, fileName), imageBuffer);
      book.cover_Image = `${fileName}`;
      return await Book.create(book);
    },

    updateBook: async (_: any, { id, book }: any) => {
      const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
      if (!updatedBook) {
        throw new UserInputError("Book not found");
      }
      return updatedBook;
    },
    deleteBook: async (_: any, { id }: any) => {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        throw new UserInputError("Book not found");
      }
      return book;
    },
  },
};

export default bookResolver;
