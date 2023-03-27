"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RatingSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true,
    },
    book_id: {
        type: String,
        required: true,
    },
    stars: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Ratings", RatingSchema);