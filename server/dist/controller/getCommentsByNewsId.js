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
exports.getCommentsByNewsId = void 0;
const Comment_1 = __importDefault(require("../models/Comment")); // Path to your Mongoose Comment model
const getCommentsByNewsId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { news_id } = req.params;
    if (!news_id) {
        res.status(400).json({ error: "News ID is required" });
        return;
    }
    try {
        const comments = yield Comment_1.default.find({ news_id }).sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    next();
});
exports.getCommentsByNewsId = getCommentsByNewsId;
