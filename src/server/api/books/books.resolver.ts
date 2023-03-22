import { UserInputError } from "apollo-server-express";
import Book from "./books";
import { createWriteStream } from "fs";
import path from "path";

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
    createBook: async (_: any, { book }: any) => {
      const { createReadStream, filename } = await book.cover_Image;
      const stream = createReadStream();
      const { ext } = path.parse(filename);
      const newFilename = `${Date.now()}${ext}`;
      const localPath = path.join(__dirname, `../books/images/${newFilename}`);

      await new Promise((resolve, reject) => {
        stream
          .pipe(createWriteStream(localPath))
          .on("finish", () =>
            resolve({ url: `http://localhost:3000/images/${newFilename}` })
          )
          .on("error", reject);
      });

      book.cover_Image = localPath;

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
