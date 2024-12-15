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
const News_1 = __importDefault(require("../models/News"));
const apicall_1 = require("../api/apicall");
const createNewsSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
    genres: zod_1.z.array(zod_1.z.string()).optional().default([]),
    imageUrls: zod_1.z.array(zod_1.z.string()).optional().default([]),
    videoUrls: zod_1.z.array(zod_1.z.string()).optional().default([]),
    author: zod_1.z.string(),
    avatar_id: zod_1.z.string(),
    created_at: zod_1.z.date(),
});
const createNews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request user:", req.user);
    if (!req.user || !req.user.username) {
        res.status(401).json({ error: "Authentication required" });
        return;
    }
    const validation = createNewsSchema.safeParse(Object.assign(Object.assign({}, req.body), { author: req.user.username, avatar_id: req.user.avatar_id, created_at: new Date() }));
    console.log("Validation result:", validation); // Debug log
    if (!validation.success) {
        console.error("Validation errors:", validation.error.errors); // Log detailed validation errors
        res.status(400).json({
            errors: validation.error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
        return;
    }
    const { title, content, genres, imageUrls, videoUrls, author, avatar_id, created_at } = validation.data;
    try {
        const existingNews = yield News_1.default.findOne({ title, content }).exec();
        if (existingNews) {
            res.status(409).json({
                error: "A news article with the same title and content already exists.",
            });
            return;
        }
        const claimScoreData = yield (0, apicall_1.getClaimScore)(content);
        let real_probability = 0;
        if (claimScoreData &&
            Array.isArray(claimScoreData.results) &&
            claimScoreData.results.length > 0 &&
            typeof claimScoreData.results[0].score === 'number') {
            real_probability = claimScoreData.results[0].score;
        }
        else {
            console.warn("Unexpected claim score API response format:", claimScoreData);
        }
        console.log("Claim score:", real_probability);
        const newNews = new News_1.default({
            title,
            content,
            avatar_id,
            author,
            genres,
            imageUrls,
            videoUrls,
            real_probability,
            created_at
        });
        yield newNews.save();
        res.status(201).json(newNews);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createNews = createNews;
