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
const books_1 = __importDefault(require("./books"));
const fs_1 = __importDefault(require("fs"));
var path = require("path");
const bookResolver = {
    Query: {
        book: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield books_1.default.findById(id);
            if (!book) {
                throw new apollo_server_express_1.UserInputError("Book not found");
            }
            return book;
        }),
        books: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield books_1.default.find();
        }),
    },
    Mutation: {
        createBook: (_, { book }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const base64Image = yield book.cover_Image;
            if (!base64Image) {
                throw new apollo_server_express_1.UserInputError("Cover Image Required");
            }
            const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");
            const fileName = `${Date.now()}.png`;
            const directory = path.join(__dirname, "../../../../public/images");
            if (!fs_1.default.existsSync(directory)) {
                fs_1.default.mkdirSync(directory, { recursive: true });
            }
            fs_1.default.writeFileSync(path.join(directory, fileName), imageBuffer);
            book.cover_Image = `${fileName}`;
            return yield books_1.default.create(book);
        }),
        updateBook: (_, { id, book }) => __awaiter(void 0, void 0, void 0, function* () {
            const updatedBook = yield books_1.default.findByIdAndUpdate(id, book, { new: true });
            if (!updatedBook) {
                throw new apollo_server_express_1.UserInputError("Book not found");
            }
            return updatedBook;
        }),
        deleteBook: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield books_1.default.findByIdAndDelete(id);
            if (!book) {
                throw new apollo_server_express_1.UserInputError("Book not found");
            }
            return book;
        }),
    },
};
exports.default = bookResolver;
