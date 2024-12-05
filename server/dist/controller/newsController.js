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
exports.createNews = void 0;
const zod_1 = require("zod");
const News_1 = __importDefault(require("../models/News")); // Path to your News model
const createNewsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
    image_url: zod_1.z.array(zod_1.z.string().url("Invalid image URL")).nonempty("At least one image URL is required"),
    video_url: zod_1.z.array(zod_1.z.string().url("Invalid video URL")).nonempty("At least one video URL is required"),
    publisher_id: zod_1.z.string({ invalid_type_error: "Invalid publisher ID format" }),
});
const createNews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = createNewsSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            errors: validation.error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
        return;
    }
    const { title, content, image_url, video_url, publisher_id } = validation.data;
    try {
        const newNews = new News_1.default({
            title,
            content,
            image_urls: image_url.map((url) => ({ url })),
            video_urls: video_url.map((url) => ({ url })),
            publisher_id,
        });
        yield newNews.save();
        res.status(201).json(newNews);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    next();
});
exports.createNews = createNews;
