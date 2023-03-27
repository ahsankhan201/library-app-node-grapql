import { UserInputError } from "apollo-server-express";
import Rating from "./rating";
import { authorization } from "../../../middleware/authorization.middleware";
import { io } from "../../../app";
const ratingResolver = {
  Mutation: {
    createRating: async (_: any, { rating }: any, context: any) => {
      const auth = await authorization(context);
      rating.user_id = auth.user;
      const result = await Rating.create(rating);
      const book = await Rating.find({ book_id: rating.book_id });
      io.emit("book-rating", { book_id: rating.book_id, ratings: book });
      return result;
    },

    updateRating: async (_: any, { id, rating }: any, context: any) => {
      const auth = await authorization(context);
      rating.user_id = auth.user;

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

export default ratingResolver;
