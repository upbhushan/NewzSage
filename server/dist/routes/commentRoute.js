"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var commentController_1 = require("../controller/commentController");
var authmiddleware_1 = require("../middlewares/authmiddleware");
var router = (0, express_1.Router)();
router.post('/', authmiddleware_1.authMiddleware, commentController_1.createComment);
exports.default = router;
