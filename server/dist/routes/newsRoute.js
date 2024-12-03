"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var newsController_1 = require("../controller/newsController");
var publishmiddleware_1 = require("../middlewares/publishmiddleware");
var router = (0, express_1.Router)();
router.post('/post', publishmiddleware_1.publisherMiddleware, newsController_1.createNews);
exports.default = router;
