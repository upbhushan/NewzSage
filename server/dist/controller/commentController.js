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
exports.createComment = void 0;
const zod_1 = require("zod");
const Comment_1 = __importDefault(require("../models/Comment")); // Path to your Mongoose Comment model
const createCommentSchema = zod_1.z.object({
    news_id: zod_1.z.string({ invalid_type_error: "Invalid news ID format" }),
    user_id: zod_1.z.string({ invalid_type_error: "Invalid user ID format" }),
    content: zod_1.z.string().min(1, "Content is required"),
});
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = createCommentSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            errors: validation.error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
        return;
    }
    const { news_id, user_id, content } = validation.data;
    try {
        const newComment = new Comment_1.default({
            news_id,
            user_id,
            content,
        });
        yield newComment.save();
        res.status(201).json(newComment);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    next();
});
exports.createComment = createComment;
