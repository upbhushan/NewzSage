"use strict";
// routes/auth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const authmiddleware_1 = require("../middlewares/authmiddleware"); // Middleware to verify JWT
const router = express_1.default.Router();
// Protected route to get user info
router.get('/user', authmiddleware_1.authMiddleware, authController_1.getUserInfo);
exports.default = router;
