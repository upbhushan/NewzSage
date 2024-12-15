"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsController_1 = require("../controller/newsController");
// import { checkPublisherRole } from '../middlewares/checkPublisherRole';
const authmiddleware_1 = require("../middlewares/authmiddleware");
const router = (0, express_1.Router)();
router.post('/post', authmiddleware_1.authMiddleware, newsController_1.createNews);
exports.default = router;
