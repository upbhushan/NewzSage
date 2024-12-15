"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllNewsController_1 = require("../controller/getAllNewsController");
const getNewsById_1 = require("../controller/getNewsById");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const router = express_1.default.Router();
router.get('/news', authmiddleware_1.authMiddleware, getAllNewsController_1.getAllNews);
router.get('/news/:id', getNewsById_1.getNewsById);
exports.default = router;
