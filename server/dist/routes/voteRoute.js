"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var voteController_1 = require("../controller/voteController");
var authmiddleware_1 = require("../middlewares/authmiddleware");
var router = (0, express_1.Router)();
router.post('/', authmiddleware_1.authMiddleware, voteController_1.createVote);
exports.default = router;
