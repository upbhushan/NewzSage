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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.signinUser = exports.createUser = void 0;
var client_1 = require("@prisma/client");
var zod_1 = require("zod");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = "asjfblansfjklasj";
var prisma = new client_1.PrismaClient();
var SALT_ROUNDS = 10;
// next: NextFunction (for middleware)
var createUserSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username is required"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
var singinUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validation, _a, username, email, password, existinguser, password_hash, newUser, token, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validation = createUserSchema.safeParse(req.body);
                if (!validation.success) {
                    res.status(400).json({
                        errors: validation.error.errors.map(function (err) { return ({
                            path: err.path,
                            message: err.message,
                        }); }),
                    });
                    return [2 /*return*/];
                }
                _a = validation.data, username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email, username: username
                        },
                    })];
            case 1:
                existinguser = _b.sent();
                if (existinguser) {
                    res.json({ error: "User already exists" });
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, bcrypt_1.default.hash(password, SALT_ROUNDS)];
            case 3:
                password_hash = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: { username: username, email: email, password_hash: password_hash },
                    })];
            case 4:
                newUser = _b.sent();
                token = jsonwebtoken_1.default.sign({
                    user_id: existinguser === null || existinguser === void 0 ? void 0 : existinguser.user_id
                }, JWT_SECRET);
                res.status(201).json({ newUser: newUser, token: token });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                res.status(500).json({ error: error_1.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var signinUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validation, _a, email, password, existinguser, passwordMatch, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validation = singinUserSchema.safeParse(req.body);
                if (!validation.success) {
                    res.status(400).json({
                        errors: validation.error.errors.map(function (err) { return ({
                            path: err.path,
                            message: err.message,
                        }); }),
                    });
                    return [2 /*return*/];
                }
                _a = validation.data, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email,
                        },
                    })];
            case 1:
                existinguser = _b.sent();
                if (!existinguser) {
                    res.json({ error: "User Does not exist" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, existinguser.password_hash)];
            case 2:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    res.json({ error: "Password does not match" });
                }
                token = jsonwebtoken_1.default.sign({
                    user_id: existinguser === null || existinguser === void 0 ? void 0 : existinguser.user_id
                }, JWT_SECRET);
                res.json({ message: "User signed in", token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.signinUser = signinUser;
var getUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.findMany()];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: error_2.message });
                return [3 /*break*/, 3];
            case 3:
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
