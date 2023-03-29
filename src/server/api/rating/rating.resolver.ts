import { UserInputError } from "apollo-server-express";
import Rating from "./rating";
import { authorization } from "../../../middleware/authorization.middleware";
import { io } from "../../../app";
import { ObjectId } from "mongodb";

const ratingResolver = {
  Mutation: {
    createRating: async (_: any, { rating }: any, context: any) => {
      const auth = await authorization(context);
      rating.user_id = new ObjectId(auth.user);
      rating.book_id = new ObjectId(rating.book_id);
      const result = await Rating.create(rating);
      broadCast(rating.book_id)
      return result;
    },

    updateRating: async (_: any, { id, rating }: any, context: any) => {
      const auth = await authorization(context);
      rating.user_id = new ObjectId(auth.user);
      rating.book_id = new ObjectId(rating.book_id);

      const updatedRating = await Rating.findByIdAndUpdate(id, rating, {
        new: true,
      });
      if (!updatedRating) {
        throw new UserInputError("Rating not found");
      }
      return updatedRating;
    },
  },
};

 const broadCast = async (id: any) => {
  const book = await Rating.find({ book_id: id });
  io.emit("book-rating", { book_id: id, ratings: book });
};

export default ratingResolver;
