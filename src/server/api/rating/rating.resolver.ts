import { UserInputError } from "apollo-server-express";
import Rating from "./rating";
import { authorization } from "../../../middleware/authorization.middleware";
const ratingResolver = {
  Mutation: {
    createRating: async (_: any, { rating }: any, context: any) => {
      const auth = await authorization(context);
      rating.user_id = auth.user;
      return await Rating.create(rating);
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
