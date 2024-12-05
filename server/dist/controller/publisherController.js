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
exports.signInPublisher = exports.createPublisher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const JWT_SECRET_PUB = "asjfblansfjklasj";
const SALT_ROUNDS = 10;
// Mongoose Models
const Publisher_1 = __importDefault(require("../models/Publisher")); // Assuming a Publisher model is defined in `models/Publisher`
// Validation Schemas
const createPublisherSchema = zod_1.z.object({
    user_id: zod_1.z.string({ invalid_type_error: "Invalid user ID format" }),
    government_id: zod_1.z.string().min(6, "Government ID must be at least 6 characters long"),
    journalism_id: zod_1.z.string().min(6, "Journalism ID must be at least 6 characters long"),
});
const createPublisher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = createPublisherSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            errors: validation.error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
        return;
    }
    const { user_id, government_id, journalism_id } = validation.data;
    try {
        const hashedGovernmentId = yield bcrypt_1.default.hash(government_id, SALT_ROUNDS);
        const hashedJournalismId = yield bcrypt_1.default.hash(journalism_id, SALT_ROUNDS);
        const newPublisher = new Publisher_1.default({
            user_id: new mongoose_1.default.Types.ObjectId(user_id),
            government_id: hashedGovernmentId,
            journalism_id: hashedJournalismId,
        });
        yield newPublisher.save();
        const token = jsonwebtoken_1.default.sign({ user_id }, JWT_SECRET_PUB, { expiresIn: "1d" });
        res.status(201).json({ newPublisher, token });
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createPublisher = createPublisher;
const signInPublisherSchema = zod_1.z.object({
    publisher_id: zod_1.z.string({ invalid_type_error: "Invalid user ID format" }),
    government_id: zod_1.z.string().min(6, "Government ID must be at least 6 characters long"),
});
const signInPublisher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = signInPublisherSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            errors: validation.error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
        return;
    }
    const { publisher_id, government_id } = validation.data;
    try {
        const publisher = yield Publisher_1.default.findById(publisher_id);
        if (!publisher) {
            res.status(404).json({ error: "Publisher not found" });
            return;
        }
        const isGovernmentIdValid = publisher.government_id && (yield bcrypt_1.default.compare(government_id, publisher.government_id));
        if (!isGovernmentIdValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ publisher_id }, JWT_SECRET_PUB, { expiresIn: "1d" });
        res.status(200).json({ token });
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.signInPublisher = signInPublisher;
