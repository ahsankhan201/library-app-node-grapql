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
const shelve_1 = __importDefault(require("./shelve"));
const authorization_middleware_1 = require("../../../middleware/authorization.middleware");
const app_constants_1 = require("../../../constants/app.constants");
const shelveResolver = {
    Query: {
        shelves: (_, context) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield (0, authorization_middleware_1.authorization)(context);
            const shelve = yield shelve_1.default.find({ user_id: auth.user });
            return shelve;
        }),
        shelveByStatus: (_, { status }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield (0, authorization_middleware_1.authorization)(context);
            const shelve = yield shelve_1.default.find({ status, user_id: auth.user });
            return shelve;
        }),
    },
    Mutation: {
        createShelve: (_, { shelve }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield (0, authorization_middleware_1.authorization)(context);
            if (!app_constants_1.shelveStatus.includes(shelve.status)) {
                throw new apollo_server_express_1.UserInputError("Invalid Status Type");
            }
            shelve.user_id = auth.user;
            return yield shelve_1.default.create(shelve);
        }),
        updateShelve: (_, { id, shelve }, context) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield (0, authorization_middleware_1.authorization)(context);
            shelve.user_id = auth.user;
            if (!app_constants_1.shelveStatus.includes(shelve.status)) {
                throw new apollo_server_express_1.UserInputError("Invalid Status Type");
            }
            const updatedBook = yield shelve_1.default.findByIdAndUpdate(id, shelve, {
                new: true,
            });
            if (!updatedBook) {
                throw new apollo_server_express_1.UserInputError("Shelve not found");
            }
            return updatedBook;
        }),
        deleteShelve: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield shelve_1.default.findByIdAndDelete(id);
            if (!book) {
                throw new apollo_server_express_1.UserInputError("Shelve not found");
            }
            return book;
        }),
    },
};
exports.default = shelveResolver;