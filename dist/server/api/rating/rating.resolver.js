"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const rating_1 = __importDefault(require("./rating"));
const authorization_middleware_1 = require("../../../middleware/authorization.middleware");
const app_1 = require("../../../app");
const mongodb_1 = require("mongodb");
const ratingResolver = {
    Mutation: {
        createRating: (_, { rating }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield (0, authorization_middleware_1.authorization)(context);
            rating.user_id = new mongodb_1.ObjectId(auth.user);
            rating.book_id = new mongodb_1.ObjectId(rating.book_id);
            const result = yield rating_1.default.create(rating);
            broadCast(rating.book_id);
            return result;
        }),
        updateRating: (_, { id, rating }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield (0, authorization_middleware_1.authorization)(context);
            rating.user_id = new mongodb_1.ObjectId(auth.user);
            rating.book_id = new mongodb_1.ObjectId(rating.book_id);
            const updatedRating = yield rating_1.default.findByIdAndUpdate(id, rating, {
                new: true,
            });
            if (!updatedRating) {
                throw new apollo_server_express_1.UserInputError("Rating not found");
            }
            return updatedRating;
        }),
    },
};
const broadCast = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield rating_1.default.find({ book_id: id });
    app_1.io.emit("book-rating", { book_id: id, ratings: book });
});
exports.default = ratingResolver;
