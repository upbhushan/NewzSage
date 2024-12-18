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
exports.getAllNews = void 0;
const News_1 = __importDefault(require("../models/News")); // Adjust the path as necessary
const getAllNews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("all");
        const news = yield News_1.default.find({}).populate('author', '-password_hash'); // Assuming each news has an 'author' field referencing User
        res.status(200).json(news);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllNews = getAllNews;
