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
exports.getUsers = exports.signinUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User")); // Assuming a Mongoose User model is defined in `models/User`
const JWT_SECRET = "asjfblansfjklasj";
const SALT_ROUNDS = 10;
// Validation Schemas
const createUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
const signinUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = createUserSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            errors: validation.error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
        return;
    }
    const { username, email, password } = validation.data;
    const existingUser = yield User_1.default.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        res.status(400).json({ error: "User already exists" });
        return;
    }
    try {
        const password_hash = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        const newUser = new User_1.default({
            username,
            email,
            password_hash,
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ user_id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({ newUser, token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = signinUserSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            errors: validation.error.errors.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
        return;
    }
    const { email, password } = validation.data;
    const existingUser = yield User_1.default.findOne({ email });
    if (!existingUser) {
        res.status(404).json({ error: "User does not exist" });
        return;
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password_hash);
    if (!passwordMatch) {
        res.status(401).json({ error: "Password does not match" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ user_id: existingUser._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "User signed in", token });
});
exports.signinUser = signinUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}, { password_hash: 0 }); // Exclude `password_hash` from results
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
    next();
});
exports.getUsers = getUsers;
