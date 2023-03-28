import { UserInputError } from "apollo-server-express";
import Shelve from "./shelve";
import { authorization } from "../../../middleware/authorization.middleware";
import { shelveStatus } from "../../../constants/app.constants";
import { ObjectId } from "mongodb";

const shelveResolver = {
  Query: {
    shelves: async (_: any, args: any, context: any) => {
      const auth = await authorization(context);
      const shelve = await Shelve.find({ user_id: new ObjectId(auth.user) });
      return shelve;
    },

    shelveByStatus: async (_: any, { status }: any, context: any) => {
      const auth = await authorization(context);
      const shelve = await Shelve.find({
        status,
        user_id: new ObjectId(auth.user),
      });
      return shelve;
    },
  },
  Mutation: {
    createShelve: async (_: any, { shelve }: any, context: any) => {
      const auth = await authorization(context);
      if (!shelveStatus.includes(shelve.status)) {
        throw new UserInputError("Invalid Status Type");
      }

      const exist = await Shelve.findOne({
        user_id: new ObjectId(auth.user),
        book_id: shelve.book_id,
      });

      if (exist) {
        shelve.user_id = new ObjectId(auth.user);
        const id = exist._id;
        const updatedBook = await Shelve.findByIdAndUpdate(id, shelve, {
          new: true,
        });
        return updatedBook;
      } else {
        shelve.user_id = new ObjectId(auth.user);
        return await Shelve.create(shelve);
      }
    },

    updateShelve: async (_: any, { id, shelve }: any, context: any) => {
      const auth = await authorization(context);
      shelve.user_id = new ObjectId(auth.user);
      if (!shelveStatus.includes(shelve.status)) {
        throw new UserInputError("Invalid Status Type");
      }
      const updatedBook = await Shelve.findByIdAndUpdate(id, shelve, {
        new: true,
      });
      if (!updatedBook) {
        throw new UserInputError("Shelve not found");
      }
      return updatedBook;
    },
    deleteShelve: async (_: any, { id }: any) => {
      const book = await Shelve.findByIdAndDelete(id);
      if (!book) {
        throw new UserInputError("Shelve not found");
      }
      return book;
    },
  },
};

export default shelveResolver;
