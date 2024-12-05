"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsController_1 = require("../controller/newsController");
const publishmiddleware_1 = require("../middlewares/publishmiddleware");
const router = (0, express_1.Router)();
router.post('/post', publishmiddleware_1.publisherMiddleware, newsController_1.createNews);
exports.default = router;
